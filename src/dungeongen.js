
import ar_e1 from './rooms/ar_e1.js'
import ar_r2 from './rooms/ar_r2.js';
import ar_r3 from './rooms/ar_r3.js';
import ar_r4 from './rooms/ar_r4.js';
import ar_r5 from './rooms/ar_r5.js';
import ar_r6 from './rooms/ar_r6.js';
import ar_r7 from './rooms/ar_r7.js';
import ar_r8 from './rooms/ar_r8.js';
import ar_r9 from './rooms/ar_r9.js';
import ar_r10 from './rooms/ar_r10.js';
import ar_r11 from './rooms/ar_r11.js';
import ar_r12 from './rooms/ar_r12.js';
import ar_r13 from './rooms/ar_r13.js';
import ar_r14 from './rooms/ar_r14.js';
import ar_r15 from './rooms/ar_r15.js';
import ar_sh1 from './rooms/ar_sh1.js';
import ar_sh2 from './rooms/ar_sh2.js';
import ar_sh3 from './rooms/ar_sh3.js';
import ar_sh4 from './rooms/ar_sh4.js';
import ar_sh5 from './rooms/ar_sh5.js';
import ar_sh6 from './rooms/ar_sh6.js';
import ar_sh7 from './rooms/ar_sh7.js';
import ar_sh8 from './rooms/ar_sh8.js';
import ar_x1 from './rooms/ar_x1.js';
import ar_x2 from './rooms/ar_x2.js';
import ar_x3 from './rooms/ar_x3.js';
import ar_x4 from './rooms/ar_x4.js';



const N = 10; //Numero de filas
const M = 10; //Numero de columnas
const maxSteps = 60; //Maximo de habitaciones


/*//El "tablero" del mapa, en el que se van generando las habitaciones
let genMatrix;

let exitArray;
let entrance; //La entrada
let shopArray;
let deadendArray;
*/
let entranceX;
let entranceY;

let thereIsExit;
let thereIsShop;
let roomArray;
let specialRoomArray;

class RoomInfo {
    constructor(roomJson, x, y) {
        this.roomJson = roomJson;
        this.x = x;
        this.y = y;
    }
};



export default class Dungeongen {

    constructor() {
        this.init();
    }


    init() {

        //Inicializacion
        let dungeon = [];

        //Llenamos la mazmorra de habitaciones vacías
        for (let i = 0; i < N; i++) {
            dungeon[i] = [];
            for (let j = 0; j < M; j++) {
                dungeon[i][j] = {

                    name: "em_r",

                    level: "all",

                    path: "../../assets/armory/em_r.tmx",

                    entrance: false,
                    exit: false,
                    empty: true, //Habitacion vacia
                    deadend: false,//para saber que solo tiene una salida
                    shop: false,

                    door_north: false,
                    door_south: false,
                    door_east: false,
                    door_west: false

                };
            }
        }


        this.fillRoomArray(0);
        this.fillSpecialRoomArray(0);

        //Generamos dos cordenadas aleatorias desde donde empezar
        entranceX = Math.floor(Math.random() * (N - 2)) + 1;
        entranceY = Math.floor(Math.random() * (M - 2)) + 1;

        //Ponemos la entrada
        dungeon[entranceY][entranceX] = ar_e1 = {

            name: "ar_e1",

            level: "armory",

            path: "../../assets/armory/ar_e1.tmx",

            entrance: true,
            exit: false,
            empty: false, //Habitacion vacia
            deadend: false,//para saber que solo tiene una salida
            shop: false,

            door_north: true,
            door_south: true,
            door_east: true,
            door_west: true

        }; //Asignamos la entrada

        console.log(`Entrada generada en la casilla: ${entranceY}, ${entranceX}`);

        thereIsExit = false;
        thereIsShop = false;

        // const generator = this.generate(dungeon, entranceX, entranceY);

        let found = null
        let maxTries = 60
        //Empezamos a generar la mazmorra
        for (found of this.generate(dungeon, entranceX, entranceY)) {
            // found = dungeonTry

            maxTries--
            if (maxTries <= 0) {
                break
            }
        }

        //Si no es valida, reempezamos el proceso
        if (!found) {
            console.log("Resetiado")
            this.init();
        }

        this.showMatrix(found);
        //Paso 2: Rellenar huecos

        //Rellenamos las habitaciones que no lleven a ningun lado
        let candidateDungeon = this.fillDungeon(found);

        if (candidateDungeon === null) {
            console.log("Resetiado")
            this.init();
        }


        console.log("--------------------------------");
        this.showMatrix(candidateDungeon);

        //Paso 3: Mirar si es valida
        if (!this.checkForValidity()) {
            console.log("Mazmorra no válida, reintentando")
            this.init();
        }


    }

    /*
    // dada una matrix, deuelve true si esto funcionaría y está terminada
    plausibleDungeon(dungeon) {
        //Preguntar pa q vale esto
        return false;
    }*/

    // devuelve null si no es aplicable, y una dungeon """nueva""" si si
    applyDirection(dungeon, direction, x, y, numberOfSteps) {
        // deep clone: JSON.parse(JSON.stringify(dungeon))

        //El array de habitaciones candidatas definitivo y los parciales
        //Así conseguimos que si sale la probabilidad de habitacion especial y no conecta ninguna, todavía tenemos el "backup" de las habitaciones normales
        //Antes de dar la casilla por perdida
        let validRoomArray = [];
        let normalValidRoomArray = [];
        let specialValidRoomArray = [];

        if (Math.random() * numberOfSteps >= (maxSteps / (Math.max(1, Math.min(numberOfSteps, maxSteps))))) { //Si sale la probabilidad generamos habitación especial
            specialValidRoomArray = this.getValidRooms(specialRoomArray, direction, x, y)
            console.log("Salió chance");
        }

        normalValidRoomArray = this.getValidRooms(roomArray, direction, x, y)
        //Mezclamos el array
        this.shuffleArray(normalValidRoomArray)

        if (specialValidRoomArray.length !== 0) { //Si no es 0
            this.shuffleArray(specialValidRoomArray) //Lo mezclamos
            validRoomArray = specialRoomArray.concat(normalValidRoomArray); //Los concatenamos
        } else {
            validRoomArray = normalValidRoomArray; //Sino simplemente el normal
        }

        //Ajustamos las coordenadas
        if (direction === 'n') {
            y -= 1;
        } else if (direction === 's') {
            y += 1;
        } else if (direction === 'e') {
            x += 1;
        } else if (direction === 'w') {
            x -= 1;
        }

        if (this.isCoordinateInsideMatrix(x, y))
            if (!this.isCoordinateOccupied(dungeon, x, y)) {
                let newDungeon = [];
                newDungeon = JSON.parse(JSON.stringify(dungeon));
                for (let room of validRoomArray) {
                    if (room.exit === true)
                        if (thereIsExit === false) {
                            newDungeon[y][x] = room; 
                            let distanceX = Math.abs(x - entranceX);
                            let distanceY = Math.abs(y - entranceY);
                            if (this.checkIfRoomConnects(x, y, newDungeon) && distanceX >= maxSteps * 0.05 && distanceY >= maxSteps * 0.05) {
                                console.log("Generando salida");
                                thereIsExit = true;
                                return newDungeon;
                            }
                        }
                    if (room.shop === true)
                        if (thereIsShop === false) {
                            newDungeon[y][x] = room; 
                            if (this.checkIfRoomConnects(x, y, newDungeon)) {
                                console.log("Generando tienda");
                                thereIsShop = true;
                                return newDungeon;
                            }
                        }
                    if (!room.shop && !room.exit) {
                        newDungeon[y][x] = room; 
                        if (this.checkIfRoomConnects(x, y, newDungeon))
                            return newDungeon;
                    }
                }


            }

        return null;
    }

    * generate(dungeon, x, y) {
        let numberOfSteps = 0;
        /* if (this.plausibleDungeon(dungeon)) {
             yield dungeon;
         }*/
        let addedRooms = []; addedRooms.push(new RoomInfo(dungeon[y][x], x, y))
        for (let roomInfo of addedRooms) {

            for (let direction of ['n', 's', 'e', 'w']) {

                numberOfSteps++;

                const newDungeon = this.applyDirection(dungeon, direction, roomInfo.x, roomInfo.y, numberOfSteps)
                if (newDungeon !== null) {
                    //Actualizamos coordenadas x y
                    if (direction === 'n') {
                        addedRooms.push(new RoomInfo(dungeon[y][x], x, y - 1))
                    } else if (direction === 's') {
                        addedRooms.push(new RoomInfo(dungeon[y][x], x, y + 1))
                    } else if (direction === 'e') {
                        addedRooms.push(new RoomInfo(dungeon[y][x], x + 1, y))
                    } else if (direction === 'w') {
                        addedRooms.push(new RoomInfo(dungeon[y][x], x - 1, y))
                    }
                    dungeon = newDungeon;
                    yield newDungeon
                } else {
                    yield dungeon;
                }
            }
        }
    }


    fillDungeon(dungeon) {
        let newDungeon = dungeon;
        for (let x = 0; x < N; x++) {
            for (let y = 0; y < M; y++) {
                //Si hay habitacion
                if (dungeon[y][x].empty === false) {
                    //Mirar si hay caminos vacios
                    let dir;
                    for (dir of this.checkForEmptyPathways(x, y, dungeon[y][x], dungeon)) {
                        if (dir !== null) {
                            newDungeon = this.fixEmptyPathway(x, y, dungeon, dir)
                            if (newDungeon === null) //Si no ha sido posible no tiene sentido seguir
                                return null;
                            dungeon = newDungeon;
                        }
                    }
                }
            }
        }

        return newDungeon;
    }

    *checkForEmptyPathways(x, y, room, dungeon) {

        for (let direction of ['n', 's', 'e', 'w']) {

            switch (direction) {

                case 'n':
                    if (y - 1 >= 0) {
                        if (room.door_north === true && dungeon[y - 1][x].empty === true) { //Si hay un camino que lleva a la nada norte
                            yield direction;
                        }
                    }
                    yield null;
                    break;
                case 's':
                    if (y + 1 < M) {
                        if (room.door_south === true && dungeon[y + 1][x].empty === true) { //Si hay un camino que lleva a la nada sur
                            yield direction;
                        }
                    }
                    yield null;
                    break;
                case 'e':
                    if (x + 1 < N) {
                        if (room.door_east === true && dungeon[y][x + 1].empty === true) { //Si hay un camino que lleva a la nada este
                            yield direction;
                        }
                    }
                    yield null;
                    break;
                case 'w':
                    if (x - 1 >= 0) {
                        if (room.door_west === true && dungeon[y][x - 1].empty === true) { //Si hay un camino que lleva a la nada oeste
                            yield direction;
                        }
                    }
                    yield null;
                    break;

            }

        }

    }

    fixEmptyPathway(x, y, dungeon, direction) {

        let validRoomArray = [];
        let normalValidRoomArray = [];
        let specialValidRoomArray = [];


        if (!thereIsExit || !thereIsShop) { //Si no hay ni tienda ni salida
            specialValidRoomArray = this.getValidRooms(specialRoomArray, direction, x, y) //Las asignamos con prioridad al array de habs validas
        }

        normalValidRoomArray = this.getValidRooms(roomArray, direction, x, y) //Ahora generamos las normales
        this.shuffleArray(normalValidRoomArray) //Lo mezclamos
        if (specialValidRoomArray.length !== 0) { //Si no es 0
            this.shuffleArray(specialValidRoomArray) //Lo mezclamos
            validRoomArray = specialRoomArray.concat(normalValidRoomArray); //Los concatenamos
        } else {
            validRoomArray = normalValidRoomArray; //Sino simplemente el normal
        }


        //Ajustamos las coordenadas
        if (direction === 'n') {
            y -= 1;
        } else if (direction === 's') {
            y += 1;
        } else if (direction === 'e') {
            x += 1;
        } else if (direction === 'w') {
            x -= 1;
        }

        let newDungeon = JSON.parse(JSON.stringify(dungeon));

        for (let room of validRoomArray) { //Recorremos los candidatos a nueva habitacion
            newDungeon[y][x] = room; //Las ponemos en la mazmorra
            if (!thereIsExit) { //Si no hay salida aun
                if (room.exit === true) { //Y la habitacion es una salida
                    console.log("Generando salida al cerrar");
                    if (this.checkIfRoomConnectsForClosing(x, y, newDungeon)) { //Miramos si conecta
                        thereIsExit = true; //Marcamos
                        return newDungeon; //Devolvemos nueva mazmorra si cierra
                    }
                }
            }
            if (!thereIsShop) { //Aqui igual
                if (room.shop === true && thereIsShop === false) {
                    console.log("Generando tienda al cerrar");
                    if (this.checkIfRoomConnectsForClosing(x, y, newDungeon)) {
                        thereIsShop = true;
                        return newDungeon; //Devolvemos nueva mazmorra si cierra
                    }
                }
            }
            if (!room.exit && !room.shop) { //Si es una habitacion normal
                if (this.checkIfRoomConnectsForClosing(x, y, newDungeon)) {
                    return newDungeon; //Devolvemos nueva mazmorra si cierra
                }
            }

        }

        return null; //Si no null y así sabemos que la mazmorra no se va a cerrar :(
    }



    getValidRooms(roomArray, direction, x, y) {

        let validRoomArray = [];

        switch (direction) {
            case 'n':
                if (!this.isCoordinateInsideMatrix(x, y - 1)) //Si la coordenada no está dentro de la matriz 
                    return validRoomArray;
                for (let room of roomArray) {
                    if (room.door_south && ((room.door_north && this.isRoomNotGoingToHaveUselessDoors(x, y - 1) || !room.door_north))) //Si se conecta a la anterior y no lleva a la nada
                        validRoomArray.push(room);
                }
                break;
            case 's':
                if (!this.isCoordinateInsideMatrix(x, y + 1)) //Si la coordenada no está dentro de la matriz 
                    return validRoomArray;
                for (let room of roomArray) {
                    if (room.door_north && ((room.door_south && this.isRoomNotGoingToHaveUselessDoors(x, y + 1) || !room.door_south)))
                        validRoomArray.push(room);
                }

                break;
            case 'e':
                if (!this.isCoordinateInsideMatrix(x + 1, y)) //Si la coordenada no está dentro de la matriz 
                    return validRoomArray;
                for (let room of roomArray) {
                    if (room.door_west && ((room.door_east && this.isRoomNotGoingToHaveUselessDoors(x + 1, y) || !room.door_east)))
                        validRoomArray.push(room);
                }

                break;
            case 'w':
                if (!this.isCoordinateInsideMatrix(x - 1, y)) //Si la coordenada no está dentro de la matriz 
                    return validRoomArray;
                for (let room of roomArray) {
                    if (room.door_east && (room.door_west && this.isRoomNotGoingToHaveUselessDoors(x - 1, y) || !room.door_west))
                        validRoomArray.push(room);
                }

                break;
        }

        return validRoomArray;
    }

    checkIfRoomConnectsForClosing(x, y, dungeon) {

        //Igual que el otro checkForClosing pero además comprueba que no vayas a dejar un camino que no lleva a la nada
        if (x + 1 < N)
            if (((dungeon[y][x + 1].empty === false && ((dungeon[y][x].door_east === true && dungeon[y][x + 1].door_west === false) || (dungeon[y][x].door_east === false && dungeon[y][x + 1].door_west === true)))) || (dungeon[y][x + 1].empty === true && dungeon[y][x].door_east === true))
                return false
        if (x - 1 >= 0)
            if ((dungeon[y][x - 1].empty === false && ((dungeon[y][x].door_west === true && dungeon[y][x - 1].door_east === false) || (dungeon[y][x].door_west === false && dungeon[y][x - 1].door_east === true))) || (dungeon[y][x - 1].empty === true && dungeon[y][x].door_west === true))
                return false
        if (y + 1 < M)
            if ((dungeon[y + 1][x].empty === false && ((dungeon[y][x].door_south === true && dungeon[y + 1][x].door_north === false) || (dungeon[y][x].door_south === false && dungeon[y + 1][x].door_north === true))) || (dungeon[y + 1][x].empty === true && dungeon[y][x].door_south === true))
                return false
        if (y - 1 >= 0)
            if ((dungeon[y - 1][x].empty === false && ((dungeon[y][x].door_north === true && dungeon[y - 1][x].door_south === false) || (dungeon[y][x].door_north === false && dungeon[y - 1][x].door_south === true))) || (dungeon[y - 1][x].empty === true && dungeon[y][x].door_north === true))
                return false

        return true;
    }

    checkIfRoomConnects(x, y, dungeon) {

        //No estoy muy orgulloso de esto xD
        if (x + 1 < N)
            if ((dungeon[y][x + 1].empty === false && ((dungeon[y][x].door_east === true && dungeon[y][x + 1].door_west === false) || (dungeon[y][x].door_east === false && dungeon[y][x + 1].door_west === true))))
                return false
        if (x - 1 >= 0)
            if ((dungeon[y][x - 1].empty === false && ((dungeon[y][x].door_west === true && dungeon[y][x - 1].door_east === false) || (dungeon[y][x].door_west === false && dungeon[y][x - 1].door_east === true))))
                return false
        if (y + 1 < M)
            if ((dungeon[y + 1][x].empty === false && ((dungeon[y][x].door_south === true && dungeon[y + 1][x].door_north === false) || (dungeon[y][x].door_south === false && dungeon[y + 1][x].door_north === true))))
                return false
        if (y - 1 >= 0)
            if ((dungeon[y - 1][x].empty === false && ((dungeon[y][x].door_north === true && dungeon[y - 1][x].door_south === false) || (dungeon[y][x].door_north === false && dungeon[y - 1][x].door_south === true))))
                return false

        return true;
    }


    isRoomNotGoingToHaveUselessDoors(x, y) {
        //Reducimos el cuadrado efectivo de las habitaciones que apuntan en la misma direccion para evitar que sus caminos lleven a la nada.
        if (x < 1)
            return false;
        else if (x >= N - 1)
            return false;
        else if (y >= M - 1)
            return false;
        else if (y < 1)
            return false;

        return true;
    }

    isCoordinateOccupied(dungeon, x, y) {
        if (dungeon[y][x].empty === false)
            return true;
        return false;
    }


    isCoordinateInsideMatrix(x, y) {
        if (x < 0)
            return false;
        else if (x >= N)
            return false;
        else if (y >= M)
            return false;
        else if (y < 0)
            return false;

        return true;
    }

    //Para mezclar el array de habitaciones para que no siempre salga la misma
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }



    checkForValidity() {
        return thereIsExit && thereIsShop;
    }

    fillRoomArray(floor) {
        roomArray = [];
        if (floor === 0) { //Armeria
            //deadendArray.push(ar_e1);
            roomArray.push(ar_r2);
            roomArray.push(ar_r4);
            roomArray.push(ar_e1);
            roomArray.push(ar_r3);
            roomArray.push(ar_r5);
            roomArray.push(ar_r6);
            roomArray.push(ar_r7);
            roomArray.push(ar_r8);
            roomArray.push(ar_r9);
            roomArray.push(ar_r10);
            roomArray.push(ar_r11);
            roomArray.push(ar_r12);
            roomArray.push(ar_r13);
            roomArray.push(ar_r14);
            roomArray.push(ar_r15);

            //TODO push exits y shops
        }
    }

    fillSpecialRoomArray(floor) {
        specialRoomArray = [];
        if (floor === 0) { //Armeria
            specialRoomArray.push(ar_x1);
            specialRoomArray.push(ar_x2);
            specialRoomArray.push(ar_x3);
            specialRoomArray.push(ar_x4);
            specialRoomArray.push(ar_sh1);
            specialRoomArray.push(ar_sh2);
            specialRoomArray.push(ar_sh3);
            specialRoomArray.push(ar_sh4);
            specialRoomArray.push(ar_sh5);
            specialRoomArray.push(ar_sh6);
            specialRoomArray.push(ar_sh7);
            specialRoomArray.push(ar_sh8);
        }
    }

    showMatrix(dungeon) {
        for (let i = 0; i < dungeon.length; i++) {
            let row = '';
            for (let j = 0; j < dungeon[i].length; j++) {
                if (dungeon[i][j] && dungeon[i][j].name) {
                    row += dungeon[i][j].name.padEnd(8); // Adjust the padding as needed
                } else {
                    row += '         '; // Placeholder for invalid room object
                }
            }
            console.table(row);
        }
    }

}


