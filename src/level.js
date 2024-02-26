import Knight from './knight.js';
import Player from './player.js';
import Phaser from 'phaser'


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'level' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        let img = this.add.image(0, 0, 'escena').setOrigin(0, 0);
        img.displayWidth = this.sys.game.config.width;
        img.displayHeight = this.sys.game.config.height;
        this.player = new Player(this, 200, 300, 0, 0, 1, 0, 1, 0);
        this.player.setScale(0.5);
        this.knight = new Knight(this, 400, 300);
        this.knight.setScale(3);
    }

}
