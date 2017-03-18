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
        case SESSION_UN_AUTHORIZE:
            return {
                ...state,
                data: []
            };
        case ENTERING_COMMENT:
            return {
                ...state,
                createdComment: action.comment,
            };
        case CREATING_COMMENT:
            return {
                ...state,
                creatingComment: true,
                creatingCommentError: false,
            };
        case COMMENT_CREATED:
            return {
                ...state,
                creatingComment: false,
                creatingCommentError: false,
                createdComment: '',
                data: state.data.concat(action.comment)
            };
        case CREATING_COMMENT_ERROR:
            return {
                ...state,
                creatingComment: false,
                creatingCommentError: true,
            };
        case COMMENTS_LOADING:
            return {
                ...state,
                loading: true,
                error: false,
                data: []
            };
        case COMMENTS_LOADING_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                data: []
            };
        case COMMENTS_LOADED:
            return {
                ...state,
                loading: false,
                error: false,
                data: action.comments,
            };
        default:
            return state
    }
}

export default favoritesState