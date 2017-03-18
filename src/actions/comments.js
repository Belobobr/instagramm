import {
    ENTERING_COMMENT,
    CREATING_COMMENT,
    COMMENT_CREATED,
    CREATING_COMMENT_ERROR,
    COMMENTS_LOADING,
    COMMENTS_LOADED,
    COMMENTS_LOADING_ERROR
} from '../constants/actionTypes';
import {status, json} from './helper';
const COMMENTS_IN_PAGE = 10;

export function makeComment(mediaId) {
    return (dispatch, getState) => {
       var createdComment = getState().comments.createdComment;

        dispatch(handleCreatingComment(createdComment));
        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = `https://api.instagram.com/v1/media/${mediaId}/comments`;

            var formData  = new FormData();
            formData.append('access_token', accessToken);
            formData.append('text', createdComment);

            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Make comment succeeded with JSON response', data);
                    dispatch(handleCommentCreated(data.data));
                })
                .catch(function (error) {
                    console.log('Make comment failed', error);
                    dispatch(handleCreatingCommentError());
                });
        } else {
            dispatch(handleCreatingCommentError());
        }
    }
}

export function enteringComment(comment) {
    return (dispatch) => {
        dispatch(handleEnteringComment(comment));
    }
}

export function loadComments(mediaId) {
    return (dispatch, getState) => {
        dispatch(handleCommentsLoading());
        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = `https://api.instagram.com/v1/media/${mediaId}/comments?count=${COMMENTS_IN_PAGE}&access_token=${accessToken}`;
            fetch(url)
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Load comments succeeded with JSON response', data);
                    dispatch(handleCommentsLoaded(data.data));
                })
                .catch(function (error) {
                    console.log('Load comments failed', error);
                    dispatch(handleCommentsLoadingError());
                });
        } else {
            dispatch(handleCommentsLoadingError());
        }
    }
}

function handleEnteringComment(comment) {
    return {type: ENTERING_COMMENT, comment}
}

function handleCreatingComment(comment) {
    return {type: CREATING_COMMENT, comment}
}

function handleCommentCreated(comment) {
    return {type: COMMENT_CREATED, comment}
}

function handleCreatingCommentError(error) {
    return {type: CREATING_COMMENT_ERROR, error}
}

function handleCommentsLoading() {
    return {type: COMMENTS_LOADING}
}

function handleCommentsLoaded(comments) {
    return {type: COMMENTS_LOADED, comments}
}

function handleCommentsLoadingError(error) {
    return {type: COMMENTS_LOADING_ERROR, error}
}