import {
    ROUTE_PUSH,
    ROUTE_POP,
    ROUTE_RESET
} from '../constants/actionTypes'
import {
    NavigationExperimental
} from 'react-native'
const {
    StateUtils: NavigationStateUtils
} = NavigationExperimental;

const initialState = {
    index: 0,
    key: 'root',
    routes: [
        {
            key: 'splash',
            title: 'Login'
        }
    ]
};

function navigationState(state = initialState, action) {
    switch (action.type) {
        case ROUTE_PUSH:
            console.log('state: ', state);
            console.log('action: ', action);
            if (state.routes[state.index].key === (action.route && action.route.key)) {
                return state;
            }
            return NavigationStateUtils.push(state, action.route);
        case ROUTE_POP:
            if (state.index === 0 || state.routes.length === 1) {
                return state;
            }
            return NavigationStateUtils.pop(state);
        case ROUTE_RESET:
            return NavigationStateUtils.reset(state, action.routes, action.index);
        default:
            return state
    }
}

export default navigationState