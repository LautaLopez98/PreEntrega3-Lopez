const nameInput = document.getElementById("name");
const greetButton = document.getElementById("greetButton");
const greetingDiv = document.getElementById("greeting");

greetButton.addEventListener("click", function () {
  const userName = nameInput.value.trim();
  if (userName !== "") {
    const greetingMessage = `¡Hola, ${userName}!`;
    greetingDiv.textContent = greetingMessage;
  } else {
    greetingDiv.textContent = "Por favor, ingresa tu nombre.";
  }
});

const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
const taskList = JSON.parse(localStorage.getItem('taskList')) || {};

function updateTaskList() {
  for (const day of daysOfWeek) {
    const taskListForDay = taskList[day] || [];
    const ul = document.querySelector(`#${day} ul`);
    ul.innerHTML = "";
    for (const task of taskListForDay) {
      const li = document.createElement("li");
      li.textContent = task;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.addEventListener("click", () => {
        deleteTask(day, task);
        updateTaskList();
      });
      li.appendChild(deleteButton);

      ul.appendChild(li);
    }
  }
}

function addTask(day, task) {
  if (!taskList[day]) {
    taskList[day] = [];
  }

  taskList[day].push(task);
  localStorage.setItem('taskList', JSON.stringify(taskList));
}

function deleteTask(day, task) {
  if (taskList[day]) {
    taskList[day] = taskList[day].filter(item => item !== task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }
}

const taskForm = document.getElementById("taskForm");
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskInput = document.getElementById("task");
  const daySelect = document.getElementById("day");
  const task = taskInput.value;
  const day = daySelect.value;

  if (task.trim() !== "") {
    addTask(day, task);
    updateTaskList();
    taskInput.value = "";
  }
});

updateTaskList();

for (const day of daysOfWeek) {
  if (taskList[day]) {
    console.log(day);
    for (const task of taskList[day]) {
      console.log(" - " + task);
    }
  }
}