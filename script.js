const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
    addTaskToDOM(task.text, task.completed);
  });
});

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTaskToDOM(taskText);
    saveTask(taskText);
    taskInput.value = '';
  }
});

function addTaskToDOM(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;

  if (completed) {
    li.classList.add('completed');
  }

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateLocalStorage();
  });

  li.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    li.remove();
    updateLocalStorage();
  });

  taskList.appendChild(li);
}

function saveTask(text) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: text, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateLocalStorage() {
  const taskElements = document.querySelectorAll('#taskList li');
  const tasks = [];

  taskElements.forEach(li => {
    tasks.push({
      text: li.textContent,
      completed: li.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
const clearAllBtn = document.getElementById('clearAllBtn');

clearAllBtn.addEventListener('click', () => {
  localStorage.removeItem('tasks');
  taskList.innerHTML = '';
});
