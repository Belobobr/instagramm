import {combineReducers} from 'redux'
import navigation from './navigation'
import session from './session';
import profile from './profile';
import hash from './hash';
import favorites from './favorites';

const rootReducer = combineReducers({
    navigation,
    session,
    profile,
    hash,
    favorites,
});

export default rootReducer