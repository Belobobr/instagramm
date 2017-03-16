import {PROFILE_LOADING, PROFILE_LOADED, PROFILE_LOADING_ERROR} from '../constants/actionTypes';
import {status, json} from './helper';

export function loadProfile() {
    return (dispatch, getState) => {
        var profileLoaded = Object.keys(getState().profile.data).length !== 0;
        if (!profileLoaded) {
            dispatch(handleProfileLoading());
        }

        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = `https://api.instagram.com/v1/users/self/?access_token=${accessToken}`;
            return fetch(url)
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Request succeeded with JSON response', data);
                    dispatch(handleProfileLoaded(data.data));
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                    dispatch(handleProfileLoadingError());
                });
        } else {
            dispatch(handleProfileLoadingError());
            return Promise.reject();
        }
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

