import {
    AsyncStorage,
    Linking
} from 'react-native';
import {HASH_MEDIA_LOADING, HASH_MEDIA_LOADED, HASH_MEDIA_LOADING_ERROR} from '../constants/actionTypes';
import {status, json} from './helper';

const TAG_NAME = "snowy";

export function loadPhotoByHash() {
    return (dispatch, getState) => {
        var hashIds = getState().hash.data.slice();
        if (hashIds.length == 0) {
            dispatch(handleHashMediaLoading());
        }

        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = `https://api.instagram.com/v1/tags/${TAG_NAME}/media/recent?access_token=${accessToken}&count=10`;
            fetch(url)
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Request succeeded with JSON response', data);
                    dispatch(handleHashMediaLoaded(data.data));
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                    dispatch(handleHashMediaLoadingError());
                });
        } else {
            dispatch(handleHashMediaLoadingError());
        }
    };
}

function handleHashMediaLoading() {
    return {type: HASH_MEDIA_LOADING}
}

function handleHashMediaLoaded(items) {
    return {type: HASH_MEDIA_LOADED, items}
}

function handleHashMediaLoadingError(error) {
    return {type: HASH_MEDIA_LOADING_ERROR, error}
}

export function clearHashData() {
    return (dispatch) => {
        dispatch(handleHashMediaLoaded([]));
    }
}


