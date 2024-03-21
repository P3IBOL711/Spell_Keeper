import ArmeriaPrueba from './scenes/armeriaPrueba.js';
import Boot from './scenes/boot.js';
import Phaser from 'phaser'
import  MainMenu  from './scenes/mainMenu.js';
import End from './scenes/end.js'

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scale: {
        mode: Phaser.Scale.FIT,  
        //autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    scene: [Boot, MainMenu, ArmeriaPrueba, End],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

new Phaser.Game(config);
