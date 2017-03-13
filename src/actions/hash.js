import {
    AsyncStorage,
    Linking
} from 'react-native';
import {HASH_MEDIA_LOADING, HASH_MEDIA_LOADED, HASH_MEDIA_LOADING_ERROR} from '../constants/actionTypes';
import {status, json} from './helper';

const TAG_NAME = "snowy";

export function loadPhotoByHash() {
    return (dispatch, getState) => {
        dispatch(handleItemsLoading());
        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = `https://api.instagram.com/v1/tags/${TAG_NAME}/media/recent?access_token=${accessToken}&count=10`;
            fetch(url)
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Request succeeded with JSON response', data);
                    dispatch(handleItemsLoaded(data.data));
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                    dispatch(handleItemsLoadingError());
                });
        } else {
            dispatch(handleItemsLoadingError());
        }
    };
}

function handleItemsLoading() {
    return {type: HASH_MEDIA_LOADING}
}

function handleItemsLoaded(items) {
    return {type: HASH_MEDIA_LOADED, items}
}

function handleItemsLoadingError(error) {
    return {type: HASH_MEDIA_LOADING_ERROR, error}
}


