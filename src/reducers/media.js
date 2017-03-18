import {
    FAVORITES_LOADED,
    HASH_MEDIA_LOADED,
    HASH_MEDIA_LOADED_NEXT,
    SESSION_UN_AUTHORIZE,
    MEDIA_ITEM_DISLIKING,
    MEDIA_ITEM_DISLIKING_ERROR,
    MEDIA_ITEM_LIKING,
    MEDIA_ITEM_LIKING_ERROR
} from '../constants/actionTypes'

const initialState = {
    data: {},
};

//TODO liking and disliking error the same, disliking and liking error too

function itemsState(state = initialState, action) {
    switch (action.type) {
        case FAVORITES_LOADED:
        case HASH_MEDIA_LOADED:
        case HASH_MEDIA_LOADED_NEXT: {
            var mergedItems = merge(state.data, action.items);
            return Object.assign({}, state, {
                // data: Object.assign({}, state.data, action.items),
                data: mergedItems,
            });
        }
        case SESSION_UN_AUTHORIZE: {
            return Object.assign({}, state, {
                data: {}
            });
        }
        case MEDIA_ITEM_DISLIKING: {
            return Object.assign({}, state, {
                data: {
                    ...state.data,
                    [action.mediaId] : {
                        ...state.data[action.mediaId],
                        user_has_liked: false,
                        likes: {
                            count: --state.data[action.mediaId].likes.count
                        }
                    }
                }
            });
        }
        case MEDIA_ITEM_DISLIKING_ERROR: {
            return Object.assign({}, state, {
                data: {
                    ...state.data,
                    [action.mediaId] : {
                        ...state.data[action.mediaId],
                        user_has_liked: true,
                        likes: {
                            count: ++state.data[action.mediaId].likes.count
                        }
                    }
                }
            });
        }
        case MEDIA_ITEM_LIKING: {
            return Object.assign({}, state, {
                data: {
                    ...state.data,
                    [action.mediaId] : {
                        ...state.data[action.mediaId],
                        user_has_liked: true,
                        likes: {
                            count: ++state.data[action.mediaId].likes.count
                        }
                    }
                }
            });
        }
        case MEDIA_ITEM_LIKING_ERROR: {
            return Object.assign({}, state, {
                data: {
                    ...state.data,
                    [action.mediaId] : {
                        ...state.data[action.mediaId],
                        user_has_liked: false,
                        likes: {
                            count: --state.data[action.mediaId].likes.count
                        }
                    }
                }
            });
        }
        default:
            return state
    }
}


//TODO don't mutate object
function merge(state, items) {
    var mergedState = state;

    items.forEach((item) => {
        mergedState[item.id] = item;
    });

    return mergedState;
}

export default itemsState