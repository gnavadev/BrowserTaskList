const inputTask = document.querySelector(".input-task");
const addTask = document.querySelector(".add-task");
const tasks = document.querySelector(".tasks");

function createRemoveButton(li) {
  li.innerText += "  ";
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.setAttribute("class", "remove");
  removeButton.setAttribute("title", "Remove Task");
  li.appendChild(removeButton);
}

document.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("remove")) {
    el.parentElement.remove();
    saveTasks();
  }
});

function cleanInput() {
  inputTask.value = "";
  inputTask.focus();
}

function createLi() {
  const li = document.createElement("li");
  return li;
}

inputTask.addEventListener("keypress", function (e) {
  if (e.which === 13) {
    if (!inputTask.value) return;
    createTask(inputTask.value);
  }
});

function createTask(inputText) {
  const li = createLi();
  li.innerText = inputText;
  tasks.appendChild(li);
  cleanInput();
  createRemoveButton(li);
  saveTasks();
}

addTask.addEventListener("click", function () {
  if (!inputTask.value) return;
  createTask(inputTask.value);
});

function saveTasks() {
  const liTasks = tasks.querySelectorAll("li");
  const taskList = [];

  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace("Remove", "").trim();

    taskList.push(taskText);
  }

  const tasksJSON = JSON.stringify(taskList);
  localStorage.setItem("tasks", tasksJSON);
}

function addSavedTasks() {
  const tasks = localStorage.getItem("tasks");
  const taskList = JSON.parse(tasks);

  for (let task of taskList) {
    createTask(task);
  }
}
addSavedTasks();
