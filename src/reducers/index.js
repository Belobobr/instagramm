import {combineReducers} from 'redux'
import navigation from './navigation'
import session from './session';
import profile from './profile';
import hash from './hash';
import favorites from './favorites';
import media from './media';
import comments from './comments';

const rootReducer = combineReducers({
    navigation,
    session,
    profile,
    hash,
    favorites,
    media,
    comments,
});

export default rootReducer