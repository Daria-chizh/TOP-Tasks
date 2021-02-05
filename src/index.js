class Task {
  constructor(name, pinned) {
    this.name = name;
    this.pinned = pinned;
  }

  setPinned(pinned) {
    this.pinned = pinned;
  }
}

const tasks = [
  new Task('Покормить кота', true),
  new Task('Убрать за котом', false),
  new Task('Погладить кота', true),
  new Task('Отвезти к ветеринару кота', false),
];

let taskName = '';

const pinnedTasksContainer = document.getElementById('pinnedTasks');
const allTasksContainer = document.getElementById('allTasks');
const inputTaskNameElement = document.getElementById('taskName');
const errorElement = document.getElementById('error');

function renderTask(task, refreshTasksFn) {
  const taskContainer = document.createElement('div');
  taskContainer.classList.add('task');

  const taskNameElement = document.createElement('label');
  taskNameElement.textContent = task.name;
  taskContainer.appendChild(taskNameElement);

  const taskPin = document.createElement('input');
  taskPin.setAttribute('type', 'checkbox');
  taskPin.classList.add('input-checkbox');
  taskContainer.appendChild(taskPin);

  if (task.pinned === true) {
    pinnedTasksContainer.appendChild(taskContainer);
    taskPin.setAttribute('checked', 'checked');
  } else {
    allTasksContainer.appendChild(taskContainer);
  }

  taskPin.addEventListener('change', (event) => {
    task.setPinned(event.target.checked);
    refreshTasksFn();
  });
}

function refreshTaskList() {
  const pinnedTasks = [];
  const allTasks = [];

  for (const task of tasks) {
    if (task.pinned === true) {
      pinnedTasks.push(task);
    }

    if (task.pinned === false) {
      if (!taskName || task.name.toLowerCase().startsWith(taskName.toLowerCase())) {
        allTasks.push(task);
      }
    }
  }

  pinnedTasksContainer.innerHTML = '';
  allTasksContainer.innerHTML = '';

  for (const task of pinnedTasks) {
    renderTask(task, refreshTaskList);
  }

  for (const task of allTasks) {
    renderTask(task, refreshTaskList);
  }

  if (pinnedTasks.length === 0) {
    const newContainer = document.createElement('span');
    newContainer.textContent = 'No pinned tasks';
    pinnedTasksContainer.appendChild(newContainer);
  }

  if (allTasks.length === 0) {
    const newContainer = document.createElement('span');
    newContainer.textContent = 'No tasks found';
    allTasksContainer.appendChild(newContainer);
  }
}

refreshTaskList();

inputTaskNameElement.addEventListener('input', () => {
  taskName = inputTaskNameElement.value;
  errorElement.innerHTML = '';
  refreshTaskList();
});

inputTaskNameElement.addEventListener('keypress', (event) => {
  if (event.code === 'Enter') {
    if (taskName) {
      const task = new Task(taskName, false);
      tasks.push(task);
      taskName = '';
      inputTaskNameElement.value = '';
      refreshTaskList();
    } else {
      errorElement.textContent = 'Ошибка, заполните поле';
    }
  }
});
