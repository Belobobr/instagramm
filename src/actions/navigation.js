import {ROUTE_POP, ROUTE_PUSH, ROUTE_RESET} from '../constants/actionTypes'

export function pushRoute(route) {
    return {
        type: ROUTE_PUSH,
        route
    }
}

export function popRoute() {
    return {
        type: ROUTE_POP
    }
}

export function resetRoutes(routes, index) {
    return {
        type: ROUTE_RESET,
        routes,
        index,
    }
}