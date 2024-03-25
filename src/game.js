import ArmeriaPrueba from './armeriaPrueba.js';
import Boot from './boot.js';
import Phaser from 'phaser'
import  MainMenu  from './scenes/mainMenu.js';
import ARR5 from './scenes/arR5.js';

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
    scene: [Boot, MainMenu, ArmeriaPrueba,ARR5],
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 400 },
            debug: true
        }
    }
};

new Phaser.Game(config);
