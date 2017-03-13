import {SESSION_AUTHORIZE, SESSION_UN_AUTHORIZE} from '../constants/actionTypes'
import {AsyncStorage, Linking} from 'react-native';
import {clearDatabaseItems} from './hash';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
import {CLIENT_ID} from '../constants/keys';
  
const REDIRECT_URI = 'https://instagramm-redirect.herokuapp.com/index.html';
  const URL = `https://api.instagram.com/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=public_content`;

const mainRoute = {
    type: 'reset',
    routes: [{
        key: 'main',
        title: 'Main'
    }]
};

const unAuthorizedRoutes = {
    type: 'reset',
    routes: [{
        key: 'login',
        title: 'Login'
    }]
};

export function authorize(accessToken, handleNavigate) {
    return (dispatch) => {
        if (accessToken == null) {
            instagrammAuth(handleNavigate, dispatch);
        } else {
            dispatch(handleAuthorized(accessToken));
            handleNavigate(mainRoute);
        }
    }
}

function instagrammAuth(handleNavigate, dispatch) {
    Linking.addEventListener('url', handleOpenURL);

    function handleOpenURL(event) {
        let accessToken = event.url.split('=')[1];

        if (accessToken != null) {
            AsyncStorage.setItem(ACCESS_TOKEN, accessToken)
                .then(() => {
                    dispatch(handleAuthorized(accessToken));
                    handleNavigate(mainRoute);
                });
        }

        Linking.removeEventListener('url', handleOpenURL)
    }

    Linking.openURL(URL).catch((err) => {
        console.error('An error occurred', err)
    });
}

export function unAuthorize(handleNavigate) {
    return (dispatch) => {
        AsyncStorage.setItem(ACCESS_TOKEN, '')
            .then(() => {
                dispatch(clearDatabaseItems());
                dispatch(handleUnAuthorized());
                handleNavigate(unAuthorizedRoutes);
            });
    }
}

function handleUnAuthorized() {
    return {type: SESSION_UN_AUTHORIZE}
}

function handleAuthorized(accessToken) {
    return {type: SESSION_AUTHORIZE, accessToken}
}
