
let welcome = () => {
  let name = prompt("Ingresá tu nombre: ");
  alert(" Hola " + name + ", " + "buen día!")
}

welcome();

const daysOfWeek = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
const taskList = {};

function promptTask() {
 const task = prompt("Ingresá una tarea (o escribí 'fin' para terminar):")
 if (task.toLowerCase() === "fin"){
    return null
 }
 else{
    return task
 }
}

function promptDay() {
while (true) {
   const day = prompt("Ingresá el día de la semana donde quieras anotarla (por ejemplo, 'Lunes'):");
   if (daysOfWeek.includes(day)) { 
    return day;
   } else {
    alert("Día de la semana no válido. Use un día de la semana válido, como 'Lunes', 'Martes', etc.");
   }
 }
}

function addTask(day, task) {
 if (!taskList[day]) {
   taskList[day] = [];
 }
 
 taskList[day].push(task);
}

while (true) {
  const task = promptTask();
  if (!task) {
    break;
  }
  const day = promptDay();
  addTask(day, task);
}

for (const day of daysOfWeek) {
  if (taskList[day]) {
    console.log(`${day}:`);
    for (const task of taskList[day]) {
      console.log(`  - ${task}`);
    }
  }
}