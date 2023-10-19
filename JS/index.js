const nameInput = document.getElementById("name");
const greetButton = document.getElementById("greetButton");
const greetingDiv = document.getElementById("greeting");
const rickImage = document.getElementById("rickImage");

greetButton.addEventListener("click", function () {
  const userName = nameInput.value.trim();
  if (userName !== "") {
    const greetingMessage = `¡Hola, ${userName}!`;
    greetingDiv.textContent = greetingMessage;
    fetch('https://rickandmortyapi.com/api/character/1')
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.image;
        rickImage.src = imageUrl;
      })
      .catch(error => {
        rickImage.src = "";
      });
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
    Toastify({
      text: `Tarea "${task}" agregada con éxito.`,
      duration: 3000,
      close: true,
    }).showToast();
  }
});

function simulateLoading() {
  const loadingOverlay = document.createElement("div");
  loadingOverlay.id = "loading-overlay";
  const loadingMessage = document.createElement("p");
  loadingMessage.textContent = "Cargando...";
  loadingOverlay.appendChild(loadingMessage);
  document.body.appendChild(loadingOverlay);
  setTimeout(() => {
    document.getElementById("loading-overlay").style.display = "none";
    updateTaskList();
  }, 1000);
}

simulateLoading();