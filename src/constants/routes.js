export const resetToMainRoute = {
    type: 'reset',
    routes: [{
        key: 'main',
        title: 'Main'
    }]
};

export const resetToUnAuthorizedRoutes = {
    type: 'reset',
    routes: [{
        key: 'login',
        title: 'Login'
    }]
};

export const pushMainRoute = {
    type: 'push',
    route: {
        key: 'main',
        title: 'Main'
    }
};

export const pushMediaItemRoute = {
    type: 'push',
    route: {
        key: 'mediaItem',
        title: 'Media Item'
    }
};