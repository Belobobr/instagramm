import {
    AsyncStorage
} from 'react-native';
import {
    PROFILE_LOADING,
    PROFILE_LOADED,
    PROFILE_LOADING_ERROR
} from '../constants/actionTypes';
import {status, json} from './helper';
import {PROFILE_KEY} from './../constants/storage';

export function loadProfile() {
    return (dispatch, getState) => {
        var profileLoaded = Object.keys(getState().profile.data).length !== 0;
        if (!profileLoaded) {
            dispatch(handleProfileLoading());
        }

        return AsyncStorage.getItem(PROFILE_KEY)
            .then((data) => {
                const cachedData = JSON.parse(data);
                if (cachedData != null) {
                    dispatch(handleProfileLoaded(cachedData.data));
                }

                const accessToken = getState().session.accessToken;
                if (accessToken != null) {
                    let url = `https://api.instagram.com/v1/users/self/?access_token=${accessToken}`;
                    fetch(url)
                        .then(status)
                        .then(json)
                        .then(function (data) {
                            console.log('Request succeeded with JSON response', data);
                            dispatch(handleProfileLoaded(data.data));
                            AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(data)).then(() => {
                                console.log('Save profile to storage', data);
                            });
                        })
                        .catch(function (error) {
                            console.log('Request failed', error);
                            dispatch(handleProfileLoadingError());
                        });
                } else {
                    dispatch(handleProfileLoadingError());
                }
            });
    }
}

function handleProfileLoading() {
    return {type: PROFILE_LOADING}
}

function handleProfileLoaded(profile) {
    return {type: PROFILE_LOADED, profile}
}

function handleProfileLoadingError(error) {
    return {type: PROFILE_LOADING_ERROR, error}
}

