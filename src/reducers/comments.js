import {
    ENTERING_COMMENT,
    COMMENTS_LOADING,
    COMMENTS_LOADED,
    COMMENTS_LOADING_ERROR,
    CREATING_COMMENT,
    COMMENT_CREATED,
    CREATING_COMMENT_ERROR,
    SESSION_UN_AUTHORIZE
} from '../constants/actionTypes'

const initialState = {
    data: [],
    loading: false,
    error: false,

    creatingComment: false,
    creatingCommentError: false,
    createdComment: '',
};

function favoritesState(state = initialState, action) {
    switch (action.type) {
        case ENTERING_COMMENT:
            return Object.assign({}, state, {
                createdComment: action.comment,
            });
        case CREATING_COMMENT:
            return Object.assign({}, state, {
                creatingComment: true,
                creatingCommentError: false,
            });
        case COMMENT_CREATED:
            return Object.assign({}, state, {
                creatingComment: false,
                creatingCommentError: false,
                createdComment: '',
                data: state.data.concat(action.comment)
            });
        case CREATING_COMMENT_ERROR:
            return Object.assign({}, state, {
                creatingComment: false,
                creatingCommentError: true,
            });
        case COMMENTS_LOADING:
            return Object.assign({}, state, {
                loading: true,
                error: false,
                data: []
            });
        case COMMENTS_LOADING_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                data: []
            });
        case COMMENTS_LOADED:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                data: action.comments,
            });
        case SESSION_UN_AUTHORIZE:
            return Object.assign({}, state, {
                data: []
            });
        default:
            return state
    }
}

export default favoritesState