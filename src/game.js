import ArmeriaPrueba from './scenes/armeriaPrueba.js';
import Boot from './scenes/boot.js';
import Phaser from 'phaser'
import  MainMenu  from './scenes/mainMenu.js';
import ARR1 from './scenes/armory/arR1.js'
import ARR2 from './scenes/armory/arR2.js'
import ARR3 from './scenes/armory/arR3.js'
import ARX1 from './scenes/armory/arX1.js'
import LBR1 from './scenes/library/lbR1.js';
import End from './scenes/end.js'


/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 512,
    scale: {
        mode: Phaser.Scale.FIT,  
        //autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    scene: [Boot, MainMenu, ArmeriaPrueba,ARR1,ARR2,ARR3,ARX1,LBR1, End],
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 400 },
            debug: true
        }
    }
};

new Phaser.Game(config);
