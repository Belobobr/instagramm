import {FAVORITES_LOADING, FAVORITES_LOADED, FAVORITES_LOADING_ERROR} from '../constants/actionTypes';
import {status, json} from './helper';

export function loadFavorites() {
    return (dispatch, getState) => {
        var favoritesIds = getState().favorites.data.slice();
        if (favoritesIds.length == 0) {
            dispatch(handleFavoritesLoading());
        }

        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = `https://api.instagram.com/v1/users/self/media/liked?access_token=${accessToken}`;
            fetch(url)
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Request succeeded with JSON response', data);
                    dispatch(handleFavoritesLoaded(data.data));
                })
                .catch(function (error) {
                    console.log('Request failed', error);
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

