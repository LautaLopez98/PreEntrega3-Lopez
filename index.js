function solicitarNombre () {
    let nombre = prompt("Ingresá tu nombre: ");
    alert(" Hola " + nombre + ", " + "buen día!")
}

let taskList = 0
function contadorTareas (){
    while (true) {
        const task = prompt("Ingresá una tarea (o escribí 'fin' para terminar):");
        if (task.toLowerCase() === "fin") {
            break;
        }
        console.log (task)
        taskList++
    }
    alert("Se anotaron " + taskList + " tareas.");
}

solicitarNombre();
console.log("Tareas para el día de hoy: ");
contadorTareas();

if (taskList == 0){
    alert("Genial! No tenés tareas hoy, dia libre!")
}
else if (taskList > 0 && taskList <= 5){
    alert("Bueno, tenés pocas tareas para hoy.")
}
else{
    alert("Wow, tenés muchas tareas para hoy! A ponerse las pilas.")
}