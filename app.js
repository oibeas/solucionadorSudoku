const tableroPuzzle = document.querySelector('#puzzle')
const botonSolucion = document.querySelector('#botonSolucion')
const solucionDisplay = document.querySelector('#solucion')
const cuadrados = 81
let cadenaSudoku = [] //cadenaSudoku es un array con todos los valores del sudoku


//Creamos los 81 cuadros del tablero con inputs del 0 al 9
for (let i = 0; i < cuadrados; i++) {
    const inputElemnet = document.createElement('input')
    inputElemnet.setAttribute('type', 'number')
    inputElemnet.setAttribute('min', 1)
    inputElemnet.setAttribute('max', 9)
    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ) {
        inputElemnet.classList.add('cuadro9x9')
    }

    tableroPuzzle.appendChild(inputElemnet)
}



//Creamos un array con todos los valores, si existe le metemos el valor del input y si no un punto
const unirValores = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            cadenaSudoku.push(input.value)
            input.classList.add('numeroInicial')
        } else {
            cadenaSudoku.push('.')
        }
    })
    console.log(cadenaSudoku);
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i]
        })
        solucionDisplay.innerHTML = 'Esta es la solucion'
    } else {
        solucionDisplay.innerHTML = 'No existe solucion'
    }
}


//Este es el metodo para enviar el sudoku a la aplicacion y que nos devuelva la solucion
const solucion = async () => {
    unirValores()
    const data = { numbers: cadenaSudoku.join('') }
    console.log('data', data);


    // const axios = require("axios");

    fetch('http://localhost:8000/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data)
            populateValues(data.solvable, data.solution)
            cadenaSudoku = []
        })
        .catch((error) => {
            console.log('Error:', error);
        })

}

//Al pulsar en el boton ejecuta la llamada al api para pedirle la solucion
botonSolucion.addEventListener('click', solucion)
