import {FAVORITES_LOADING, FAVORITES_LOADED, FAVORITES_LOADING_ERROR, SESSION_UN_AUTHORIZE} from '../constants/actionTypes'

const initialState = {
    data: {},
    loading: false,
    error: false,
};

function favoritesState(state = initialState, action) {
    switch (action.type) {
        case FAVORITES_LOADING:
            return Object.assign({}, state, {
                loading: true,
                error: false,
                data: {}
            });
        case FAVORITES_LOADING_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                data: {}
            });
        case FAVORITES_LOADED:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: action.favorites,
            });
        case SESSION_UN_AUTHORIZE:
            return Object.assign({}, state, {
                data: {}
            });
        default:
            return state
    }
}

export default favoritesState