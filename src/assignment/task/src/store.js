const {
    createAction,
    createReducer,
    configureStore,
  } = require("@reduxjs/toolkit");
  const {
    initialState,
    add,
    done,
    undone,
    cancel,
    loadTasks,
  } = require("./reducer");
  
  const addAction = createAction("add");
  const doneAction = createAction("done");
  const undoneAction = createAction("undone");
  const cancelAction = createAction("cancel");
  const loadAction = createAction("loadTasks");
  
  const todoReducer = createReducer(initialState, {
    [addAction]: add,
    [doneAction]: done,
    [undoneAction]: undone,
    [cancelAction]: cancel,
    [loadAction]: loadTasks,
  });
  
  const store$ = configureStore({
    reducer: todoReducer,
  });
  
  module.exports = {
    store$,
    addAction,
    doneAction,
    undoneAction,
    cancelAction,
    loadAction,
  };
  