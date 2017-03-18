import {
    FAVORITES_LOADING,
    FAVORITES_LOADED,
    FAVORITES_LOADING_ERROR,
    SESSION_UN_AUTHORIZE,
    MEDIA_ITEM_DISLIKING,
    MEDIA_ITEM_DISLIKING_ERROR,
    MEDIA_ITEM_LIKING,
    MEDIA_ITEM_LIKING_ERROR
} from '../constants/actionTypes'

const initialState = {
    data: [],
    loading: false,
    error: false,
};

//https://github.com/markerikson/redux/blob/structuring-reducers-page/docs/recipes/reducers/09-ImmutableUpdatePatterns.md

function favoritesState(state = initialState, action) {
    switch (action.type) {
        case FAVORITES_LOADING:
            return Object.assign({}, state, {
                loading: true,
                error: false,
                data: []
            });
        case FAVORITES_LOADING_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                data: []
            });
        case FAVORITES_LOADED:
            var ids = action.items.map((media) => {
                return media.id
            });
            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: ids,
            });
        case SESSION_UN_AUTHORIZE:
            return Object.assign({}, state, {
                data: []
            });
        case MEDIA_ITEM_DISLIKING: {
            let itemPosition = state.data.indexOf(action.mediaId);

            return itemPosition >= 0
                ? Object.assign({}, state, {
                data: [
                    ...state.data.slice(0, itemPosition),
                    ...state.data.slice(itemPosition + 1)
                ],
            })
                : state;
        }
        case MEDIA_ITEM_DISLIKING_ERROR:
            return Object.assign({}, state, {
                data: state.data.concat(action.mediaId)
            });
        case MEDIA_ITEM_LIKING:
            return Object.assign({}, state, {
                data: state.data.concat(action.mediaId)
            });
        case MEDIA_ITEM_LIKING_ERROR: {
            let itemPosition = state.data.indexOf(action.mediaId);

            return itemPosition > 0
                ? Object.assign({}, state, {
                data: [
                    ...state.data.slice(0, itemPosition),
                    ...state.data.slice(itemPosition + 1)
                ],
            })
                : state;
        }
        default:
            return state
    }
}

export default favoritesState