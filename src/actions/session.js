import {AsyncStorage, Linking} from 'react-native';
import CookieManager from 'react-native-cookies';
import {CLIENT_ID} from '../constants/keys';
import {loadProfile} from './profile';
import {clearHashData} from './hash';
import {resetToMainRoute, resetToUnAuthorizedRoutes} from './../constants/routes';
import {SESSION_AUTHORIZE, SESSION_UN_AUTHORIZE} from '../constants/actionTypes'
import {ACCESS_TOKEN_KEY} from './../constants/storage';

const REDIRECT_URI = 'https://instagramm-redirect.herokuapp.com/index.html';
const URL = `https://api.instagram.com/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=public_content`;

//TODO make method init (will authorize and load some data (profile)

export function initApp(handleNavigate) {
    return (dispatch) => {
        AsyncStorage.getItem(ACCESS_TOKEN_KEY).then((accessToken) => {
            if (accessToken != null) {
                onAuthorized(accessToken, dispatch, handleNavigate);
            } else {
                onUnAuthorized(handleNavigate);
            }
        });
    }
}

function onAuthorized(accessToken, dispatch, handleNavigate) {
    dispatch(handleAuthorized(accessToken));
    dispatch(loadProfile()).then(()=> {
        handleNavigate(resetToMainRoute);
    });
}

function onUnAuthorized(handleNavigate) {
    handleNavigate(resetToUnAuthorizedRoutes);
}

export function authorize(handleNavigate) {
    return (dispatch) => {
        Linking.addEventListener('url', handleOpenURL);
        CookieManager.getAll((err, res) => {
            console.log('before login!');
            console.log(err);
            console.log(res);
        });


        function handleOpenURL(event) {
            let accessToken = event.url.split('=')[1];
            CookieManager.getAll((err, res) => {
                console.log('after login!');
                console.log(err);
                console.log(res);
            });
            console.log('access token: ' + accessToken);

            if (accessToken != null) {
                AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
                    .then(() => {
                        onAuthorized(accessToken, dispatch, handleNavigate);
                    });
            }

            Linking.removeEventListener('url', handleOpenURL)
        }

        Linking.openURL(URL).catch((err) => {
            console.error('An error occurred', err)
        });
    }
}

export function unAuthorize(handleNavigate) {
    CookieManager.getAll((err, res) => {
        console.log('before unAuthorize!');
        console.log(err);
        console.log(res);
    });

    return (dispatch) => {
        CookieManager.clearAll((err, res) => {
            CookieManager.getAll((err, res) => {
                console.log('after unAuthorize!');
                console.log(err);
                console.log(res);
            });
            if (err) {
                console.error('Error occured during clearing cookies');
            }

            AsyncStorage.setItem(ACCESS_TOKEN_KEY, '')
                .then(() => {
                    dispatch(clearHashData());
                    dispatch(handleUnAuthorized());
                    onUnAuthorized(handleNavigate);
                });
        });
    }
}

function handleUnAuthorized() {
    return {type: SESSION_UN_AUTHORIZE}
}

function handleAuthorized(accessToken) {
    return {type: SESSION_AUTHORIZE, accessToken}
}
