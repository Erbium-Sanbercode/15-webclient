const { dispatch } = require('rxjs/internal/observable/pairs');
const { showTaskApi, addTaskApi, doneTaskApi, undoneTaskApi, cancelTaskApi } = require('../api/task-service');
const { addAction, doneAction, undoneAction, cancelAction, loadAction } = require("./store");

const addTaskAsync = (task) => async (dispatch, getState) => {
  const taskData = await addTaskApi(task);
  dispatch(addAction(taskData));
};

const showTasksAsync = async (dispatch, getState) => {
  const tasksAsync = await showTaskApi();
  dispatch(loadAction(tasksAsync));
};

const doneTaskAsync = (id) => {
  return async (dispatch, getState) => {
    await doneTaskApi(id);
    dispatch(doneAction(id));
  };
};

const undoneTaskAsync = (id) => {
  return async (dispatch, getState) => {
    try {
      await undoneTaskApi(id);
      dispatch(undoneAction(id));
    } catch (err) {
      console.log(err);
    }
  }
}

const cancelTaskAsync = (id) => {
  return async (dispatch, getState) => {
    await cancelTaskApi(id);
    dispatch(cancelAction(id));
  };
};

module.exports = {
  addTaskAsync,
  showTasksAsync,
  doneTaskAsync,
  undoneTaskAsync,
  cancelTaskAsync
};
