// setup state
const initialState = [
    { id: 1, task: 'Belajar Sanbercode', assignee_id: 1, attachment: 'tes.txt', done: false, cancel: false},
  ];
  
// reduce function
function add(state, action) {
    const output = action.payload.split('-');
    state.push({ id: action.payload.id, task: output[0], assignee_id: output[1], attachment: output[2], done: false, cancel: false });
    return state;
  }
  
  function done(state, action) {
    const task = state.find((t) => t.id === action.payload);
    task.done = true;
    return state;
  }
  
  function undone(state, action) {
    const task = state.find((t) => t.id === action.payload);
    task.done = false;
    return state;
  }
  
  function cancel(state, action) {
    const task = state.find((t) => t.id === action.payload);
    const indexHapus = state.findIndex(i => i.id === action.payload)
    task.cancel = true;
    state.splice(indexHapus, 1);
    return state;
  }

  function loadTasks(state, action) {
    state = action.payload;
    return state;
  }
  
  module.exports = {
    initialState,
    add,
    done,
    undone,
    cancel,
    loadTasks,
  };
  