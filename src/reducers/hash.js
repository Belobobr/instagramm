import {
    SESSION_UN_AUTHORIZE,
    HASH_MEDIA_LOADING,
    HASH_MEDIA_LOADING_ERROR,
    HASH_MEDIA_LOADED,
    HASH_MEDIA_NEXT_URL,
    HASH_MEDIA_LOADING_NEXT,
    HASH_MEDIA_LOADED_NEXT,
    HASH_MEDIA_LOADING_NEXT_ERROR,
} from '../constants/actionTypes'

const initialState = {
    data: [],
    loading: false,
    error: false,

    nextPageUrl: '',
    nextPageLoading: false,
    nextPageLoadingError: false,
};

function itemsState(state = initialState, action) {
    switch (action.type) {
        case SESSION_UN_AUTHORIZE:
            return Object.assign({}, state, {
                data: []
            });
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
        case HASH_MEDIA_LOADED: {
            let ids = action.items.map((media) => {return media.id});
            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: ids,
            });
        }
        case HASH_MEDIA_NEXT_URL:
            return Object.assign({}, state, {
                nextPageUrl: action.url
            });
        case HASH_MEDIA_LOADING_NEXT:
            return Object.assign({}, state, {
                nextPageLoading: true,
                nextPageLoadingError: false,
            });
        case HASH_MEDIA_LOADED_NEXT: {
            let ids = action.items.map((media) => {return media.id});
            return Object.assign({}, state, {
                nextPageLoading: false,
                nextPageLoadingError: false,
                data: state.data.concat(ids),
            });
        }
        case HASH_MEDIA_LOADING_NEXT_ERROR:
            return Object.assign({}, state, {
                nextPageLoading: false,
                nextPageLoadingError: true,
            });
        default:
            return state
    }
}

export default itemsState