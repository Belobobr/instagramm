import {
    AsyncStorage
} from 'react-native';
import {
    FAVORITES_LOADING,
    FAVORITES_LOADED,
    FAVORITES_LOADING_ERROR
} from '../constants/actionTypes';
import {status, json} from './helper';
import {FAVORITES_KEY} from './../constants/storage';

export function loadFavorites() {
    return (dispatch, getState) => {
        var favoritesIds = getState().favorites.data.slice();
        if (favoritesIds.length == 0) {
            dispatch(handleFavoritesLoading());

            AsyncStorage.getItem(FAVORITES_KEY).then((favoritesData) => {
                const cachedData = JSON.parse(favoritesData);
                if (cachedData != null) {
                    dispatch(handleFavoritesLoaded(cachedData.data));
                }
            });
        }

        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = `https://api.instagram.com/v1/users/self/media/liked?access_token=${accessToken}`;
            fetch(url)
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Load favorites succeeded with JSON response', data);
                    dispatch(handleFavoritesLoaded(data.data));
                    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(data)).then(() => {
                        console.log('Save favorites to storage', data);
                    });
                })
                .catch(function (error) {
                    console.log('Load favorites failed', error);
                    dispatch(handleFavoritesError());
                });
        } else {
            dispatch(handleFavoritesError());
        }
    }
}

function handleFavoritesLoading() {
    return {type: FAVORITES_LOADING}
}

function handleFavoritesLoaded(items) {
    return {type: FAVORITES_LOADED, items}
}

function handleFavoritesError(error) {
    return {type: FAVORITES_LOADING_ERROR, error}
}

