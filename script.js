// Algoritmo con condicional:
function notas() {
    let numero1 = parseFloat(prompt("Ingresa la nota del primer alumno:"));
    let numero2 = parseFloat(prompt("Ingresa la nota del segundo alumnoo:"));
    let numero3 = parseFloat(prompt("Ingresa la nota del tercer alumno:"));

    if (isNaN(numero1) || isNaN(numero2) || isNaN(numero3)) {
        alert("Oye, ingresa notas válidas...");
        return;
    }

    let promedio = (numero1 + numero2 + numero3) / 3;

    alert("¡Yuju! Monii, usando IF calculamos que el promedio de la nota de tus alumnos es: " + promedio);
}

notas();

// Algoritmo con ciclo: 
let numero1 = parseFloat(prompt("Ingresa la nota del primer alumno:"));
let numero2 = parseFloat(prompt("Ingresa la nota del segundo alumnoo:"));
let numero3 = parseFloat(prompt("Ingresa la nota del tercer alumno:"));

for (let i = 1; i <= i; i++) {
    let resultado = (numero1 + numero2 + numero3) / 3;
    alert("¡Yuju! Monii, usando FOR calculamos que  el promedio de la nota de tus alumnos es: " + resultado);
}