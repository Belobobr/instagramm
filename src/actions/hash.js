import {
    AsyncStorage
} from 'react-native';
import {
    HASH_MEDIA_LOADING,
    HASH_MEDIA_LOADED,
    HASH_MEDIA_LOADING_ERROR,
    HASH_MEDIA_NEXT_URL,
    HASH_MEDIA_LOADING_NEXT,
    HASH_MEDIA_LOADED_NEXT,
    HASH_MEDIA_LOADING_NEXT_ERROR,
} from '../constants/actionTypes';
import {status, json} from './helper';
import {HASH_KEY} from './../constants/storage';

const TAG_NAME = "snowy";

export function loadPhotoByHash() {
    return (dispatch, getState) => {
        var hashIds = getState().hash.data.slice();
        if (hashIds.length == 0) {
            dispatch(handleHashMediaLoading());

            AsyncStorage.getItem(HASH_KEY).then((hashData) => {
                const cachedData = JSON.parse(hashData);
                if (cachedData != null) {
                    dispatch(handleHashMediaLoaded(cachedData.data));
                    dispatch(handleHashMediaNextUrl(cachedData.pagination.next_url));
                }
            });
        }

        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = `https://api.instagram.com/v1/tags/${TAG_NAME}/media/recent?access_token=${accessToken}&count=10`;
            fetch(url)
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Load by hash succeeded with JSON response', data);
                    dispatch(handleHashMediaLoaded(data.data));
                    dispatch(handleHashMediaNextUrl(data.pagination.next_url));
                    AsyncStorage.setItem(HASH_KEY, JSON.stringify(data)).then(() => {
                        console.log('Save hash to storage', data);
                    });
                })
                .catch(function (error) {
                    console.log('Load by hash failed', error);
                    dispatch(handleHashMediaLoadingError());
                });
        } else {
            dispatch(handleHashMediaLoadingError());
        }
    };
}

export function loadNextPhotosByHash() {
    return (dispatch, getState) => {
        if (getState().hash.nextPageLoading || !getState().hash.nextPageUrl) {
            return;
        }

        dispatch(handleHashMediaLoadingNext());
        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = getState().hash.nextPageUrl;
            fetch(url)
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Request succeeded with JSON response', data);
                    dispatch(handleHashMediaLoadedNext(data.data));
                    dispatch(handleHashMediaNextUrl(data.pagination.next_url))
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                    dispatch(handleHashMediaLoadingNextError(error));
                });
        } else {
            dispatch(handleHashMediaLoadingNextError());
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

function handleHashMediaNextUrl(url) {
    return {type: HASH_MEDIA_NEXT_URL, url}
}

function handleHashMediaLoadingNext() {
    return {type: HASH_MEDIA_LOADING_NEXT}
}

function handleHashMediaLoadedNext(items) {
    return {type: HASH_MEDIA_LOADED_NEXT, items}
}

function handleHashMediaLoadingNextError(error) {
    return {type: HASH_MEDIA_LOADING_NEXT_ERROR, error}
}

export function clearHashData() {
    return (dispatch) => {
        dispatch(handleHashMediaLoaded([]));
    }
}


