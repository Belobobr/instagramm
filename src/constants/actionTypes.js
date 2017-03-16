import keyMirror from 'keymirror';

module.exports = keyMirror({
    ROUTE_PUSH: null,
    ROUTE_POP: null,
    ROUTE_RESET: null,

    SESSION_AUTHORIZE: null,
    SESSION_UN_AUTHORIZE: null,

    PROFILE_LOADING: null,
    PROFILE_LOADED: null,
    PROFILE_LOADING_ERROR: null,

    HASH_MEDIA_LOADING: null,
    HASH_MEDIA_LOADED: null,
    HASH_MEDIA_LOADING_ERROR: null,
    ITEMS_ADD: null,

    FAVORITES_LOADING: null,
    FAVORITES_LOADED: null,
    FAVORITES_IDS_LOADED: null,
    FAVORITES_LOADING_ERROR: null,

    ENTERING_COMMENT: null,
    CREATING_COMMENT: null,
    COMMENT_CREATED: null,
    CREATING_COMMENT_ERROR: null,

    COMMENTS_LOADING: null,
    COMMENTS_LOADED: null,
    COMMENTS_LOADING_ERROR: null,

    MEDIA_ITEM_LIKING: null,
    MEDIA_ITEM_LIKED: null,
    MEDIA_ITEM_LIKING_ERROR: null,

    MEDIA_ITEM_DISLIKING: null,
    MEDIA_ITEM_DISLIKED: null,
    MEDIA_ITEM_DISLIKING_ERROR: null,
});