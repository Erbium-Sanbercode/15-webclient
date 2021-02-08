const loggingMiddleware = (store) => {
    return (next) => {
        return (action) => {
            console.log('dispatch', action.type);
            let result = next(action)
            return result;
        }
    }
}

const asyncMiddleware = store => next => action => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }

    return next(action);
}

module.exports = {
    loggingMiddleware,
    asyncMiddleware
}