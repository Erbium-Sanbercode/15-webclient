const {
    createAction,
    createReducer,
    configureStore,
} = require('@reduxjs/toolkit');

const thunkMiddleware = require('redux-thunk');

// reducer
const {
    initialState,
    write,
    read
 } = require("./reducer");

// middleware
const {
    loggingMiddleware,
    asyncMiddleware
} = require("./middleware");


// action
const writeAction = createAction("write");
const readAction = createAction("read");


// create reducer
const workerReducer = createReducer(initialState, {
    [writeAction]: write,
    [readAction]: read
});

// configure reducer
const store$ = configureStore({
    reducer: workerReducer,
    middleware: [thunkMiddleware.default, asyncMiddleware]
});


module.exports = {
    store$,
    writeAction,
    readAction
}