import Phaser from 'phaser'

 const N = 10; //Numero de filas
 const M = 10; //Numero de columnas
 const roomsPath = './rooms';

const fs = require('fs');
const path = require('path');

 //El "tablero" del mapa, en el que se van generando las habitaciones
 const genMatrix = [];
 const roomArray = [];

//Inicializacion
for (let i = 0; i < N; i++) {
    genMatrix[i] = []; 
    for (let j = 0; j < M; j++) {
        genMatrix[i][j] = -1; //Inicializamos a -1 que significa "sin habitacion en esta caso"
    }
}

//Generamos dos cordenadas aleatorias desde donde empezar
const randomRow = Math.floor(Math.random() * N);
const randomCol = Math.floor(Math.random() * M);

genMatrix[randomRow][randomCol] = 0; //Lo señalamos como la entrada al piso

console.log("Entrada generada en la casilla: ${genMatrix[randomRow][randomCol]}");

//Leemos las habitaciones y las ponemos en un array de habitaciones.
fs.readdirSync(roomsPath).forEach(file => {

    const filePath = path.join(roomsPath,file);

    const room = require(filePath);

    roomArray.push(room);

});

