const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

function mostrarMenu() {
  console.log('\nSelecciona una opción:');
  console.log('1. Listar tareas');
  console.log('2. Agregar tarea');
  console.log('3. Completar tarea');
  console.log('4. Eliminar tarea');
  console.log('Q. Salir');
}

function listarTareas() {
  console.log('\nLista de tareas:');
  if (tasks.length === 0) {
    console.log('No hay tareas.');
  } else {
    tasks.forEach((task, index) => {
      const estado = task.completada ? 'Completada' : 'Pendiente';
      console.log(`${index + 1}. [${estado}] - ${task.descripcion}`);
    });
  }
}

function agregarTarea() {
  rl.question('Ingresa la descripción de la tarea: ', (descripcion) => {
    tasks.push({ descripcion, completada: false });
    console.log('Tarea agregada con éxito.');
    mostrarMenu();
    ejecutarAccion();
  });
}

function completarTarea() {
  listarTareas();
  rl.question('Ingresa el número de la tarea que deseas completar: ', (numero) => {
    const index = parseInt(numero) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks[index].completada = true;
      console.log('Tarea completada con éxito.');
    } else {
      console.log('Número de tarea no válido.');
    }
    mostrarMenu();
    ejecutarAccion();
  });
}

function eliminarTarea() {
  listarTareas();
  rl.question('Ingresa el número de la tarea que deseas eliminar: ', (numero) => {
    const index = parseInt(numero) - 1;
    if (index >= 0 && index < tasks.length) {
      tasks.splice(index, 1);
      console.log('Tarea eliminada con éxito.');
    } else {
      console.log('Número de tarea no válido.');
    }
    mostrarMenu();
    ejecutarAccion();
  });
}

function ejecutarAccion() {
  rl.question('Selecciona una opción o presiona "Q" para salir: ', (opcion) => {
    switch (opcion.toLowerCase()) {
      case 'q':
        console.log('Saliendo del programa.');
        rl.close();
        break;
      case '1':
        listarTareas();
        ejecutarAccion();
        break;
      case '2':
        agregarTarea();
        break;
      case '3':
        completarTarea();
        break;
      case '4':
        eliminarTarea();
        break;
      default:
        console.log('Opción no válida.');
        mostrarMenu();
        ejecutarAccion();
    }
  });
}

mostrarMenu();
ejecutarAccion();
