import {
    MEDIA_ITEM_LIKING,
    MEDIA_ITEM_LIKED,
    MEDIA_ITEM_LIKING_ERROR,
    MEDIA_ITEM_DISLIKING,
    MEDIA_ITEM_DISLIKED,
    MEDIA_ITEM_DISLIKING_ERROR
} from '../constants/actionTypes';
import {status, json} from './helper';

export function like(mediaId) {
    return (dispatch, getState) => {
        dispatch(handleMediaItemLiking(mediaId));
        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = `https://api.instagram.com/v1/media/${mediaId}/likes`;
            var formData  = new FormData();
            formData.append('access_token', accessToken);

            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Request succeeded with JSON response', data);
                    dispatch(handleMediaItemLiked(mediaId));
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                    dispatch(handleMediaItemLikingError(mediaId));
                });
        } else {
            dispatch(handleMediaItemLikingError(mediaId));
        }
    }
}

export function dislike(mediaId) {
    return (dispatch, getState) => {
        dispatch(handleMediaItemDisliking(mediaId));
        const accessToken = getState().session.accessToken;
        if (accessToken != null) {
            let url = `https://api.instagram.com/v1/media/${mediaId}/likes?access_token=${accessToken}`;
            fetch(url, {
                method: "DELETE",
            })
                .then(status)
                .then(json)
                .then(function (data) {
                    console.log('Request succeeded with JSON response', data);
                    dispatch(handleMediaItemDisliked(mediaId));
                })
                .catch(function (error) {
                    console.log('Request failed', error);
                    dispatch(handleMediaItemDislikingError(mediaId));
                });
        } else {
            dispatch(handleMediaItemDislikingError(mediaId));
        }
    }
}

function handleMediaItemLiking(mediaId) {
    return {type: MEDIA_ITEM_LIKING, mediaId}
}

function handleMediaItemLiked(mediaId) {
    return {type: MEDIA_ITEM_LIKED, mediaId}
}

function handleMediaItemLikingError(mediaId) {
    return {type: MEDIA_ITEM_LIKING_ERROR, mediaId}
}

function handleMediaItemDisliking(mediaId) {
    return {type: MEDIA_ITEM_DISLIKING, mediaId}
}

function handleMediaItemDisliked(mediaId) {
    return {type: MEDIA_ITEM_DISLIKED, mediaId}
}

function handleMediaItemDislikingError(mediaId) {
    return {type: MEDIA_ITEM_DISLIKING_ERROR, mediaId}
}