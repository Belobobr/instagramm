import {SESSION_AUTHORIZE, SESSION_UN_AUTHORIZE} from '../constants/actionTypes'

const initialState = {
    accessToken: null,
};

function sessionState(state = initialState, action) {
    switch (action.type) {
        case SESSION_AUTHORIZE:
            return Object.assign({}, state, {accessToken: action.accessToken});
        case SESSION_UN_AUTHORIZE:
            return Object.assign({}, state, {accessToken: null});
        default:
            return state
    }
}

export default sessionState