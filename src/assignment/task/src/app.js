require("./app.css");
const { store$ } = require('./store');
const {
  addTaskAsync,
  showTasksAsync,
  doneTaskAsync,
  undoneTaskAsync,
  cancelTaskAsync
} = require('./task-client');

const task = document.getElementById("task");
const IDworker = document.getElementById("id-worker");
const assignment = document.getElementById("attachment");
const form = document.getElementById("task-form");
const list = document.getElementById("task-list");

form.onsubmit = (event) => {
  event.preventDefault();
  const taskValue = task.value
  const IDworkerValue = IDworker.value;
  const assignmentValue = assignment.value.split('C:\\fakepath\\');
  console.log(assignmentValue.length)
  if (!taskValue?.length && !IDworkerValue?.length && assignmentValue.length === 1) {
    return;
  }
  // dispatch action add
  const payload = taskValue+"-"+IDworkerValue+"-"+assignmentValue[1]
  store$.dispatch(addTaskAsync(payload));
  task.value = "";
  IDworker.value = "";
  assignment.value = "";
};

// presentation layer
store$.subscribe(() => {
  const state = store$.getState();
  render(state);
});

const state = store$.getState();
render(state);

store$.dispatch(showTasksAsync);

function render(state) {
  list.innerHTML = "";
  for (let i = 0; i < state.length; i++) {
    const task = state[i];
    const li = document.createElement("li");
    const btn = document.createElement("BUTTON");
    const check = document.createElement("INPUT");
    li.textContent = "Task: "+task.task+" | Pekerja: "+task.assignmentID;
    
    check.setAttribute("type", "checkbox");
    check.onclick = function () {
      if (!state[i].done) {
        // dispatch action done
        store$.dispatch(doneTaskAsync(task.id));
      } else {
        // dispatch action undone
        store$.dispatch(undoneTaskAsync(task.id));
      }
    };
    
    btn.innerHTML = 'Cancel';
    btn.onclick = function () {
      // dispatch action remove
      store$.dispatch(cancelTaskAsync(task.id));
    };
    
    li.prepend(check);
    li.appendChild(btn);
    if (task.done) {
      li.className = "task-done";
      check.checked = true;
    } else {
      li.className = "";
      check.checked = false;
    }
    list.append(li);
  }
}