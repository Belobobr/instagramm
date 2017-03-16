import {HASH_MEDIA_LOADING, HASH_MEDIA_LOADING_ERROR, HASH_MEDIA_LOADED, SESSION_UN_AUTHORIZE} from '../constants/actionTypes'

const initialState = {
    data: [],
    loading: false,
    error: false,
};

function itemsState(state = initialState, action) {
    switch (action.type) {
        case HASH_MEDIA_LOADING:
            return Object.assign({}, state, {
                loading: true,
                error: false,
                data: []
            });
        case HASH_MEDIA_LOADING_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                data: []
            });
        case HASH_MEDIA_LOADED:
            var ids = action.items.map((media) => {return media.id});
            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: ids,
            });
        case SESSION_UN_AUTHORIZE:
            return Object.assign({}, state, {
                data: []
            });
        default:
            return state
    }
}

export default itemsState