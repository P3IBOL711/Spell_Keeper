import Skeleton from '../archer_skeleton.js';
import Arrow from '../arrow.js';
import Knight from '../knight.js';
import Player from '../player.js';
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
        this.knight = new Knight(this, 400, 300, this.player);
        this.skeleton = new Skeleton(this, 600, 300, this.player);     
        this.arrow = new Arrow(this, 800, 300, 1000, 1000);
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
        // no se podrá ejecutar la animación del sprite. 
        super.preUpdate(t, dt);
    }

}