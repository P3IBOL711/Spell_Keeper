import Phaser from 'phaser'
import Player from '../player.js'
import Skeleton from '../enemies/archerSkeleton.js';
import Arrow from '../projectiles/arrow.js';
import Knight from '../enemies/knight.js';
import PoisonousGoblin from '../enemies/poisonousGoblin.js';
import CarnivorousPlant from '../enemies/carnivorousPlant.js';
import StandardSkeleton from '../enemies/standardSkeleton.js';
import MagicSkeleton from '../enemies/magicSkeleton.js';
import LavaGolem from '../enemies/lavaGolem.js';



/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class ArmeriaPrueba extends Phaser.Scene {
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'armeriaPrueba' });
    }
    /*init: se ejecuta cuando se carga la escena. Aquí se pueden pasar datos entre escenas.
      preload: aquí hay que cargar los recursos antes de que sean usados.
      create: una vez que la clase está instanciada y el motor está a punto, se llama a este método para inicializar.
      update(time, delta): se llama cada ciclo de juego, para modificar el estado.
    */

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        this.enemies = this.add.group()
        // this.walls para cuando haya paredes
        let img = this.add.image(0, 0, 'escenaPrueba').setOrigin(0, 0);
        img.displayWidth = this.sys.game.config.width;
        img.displayHeight = this.sys.game.config.height;
        this.player = new Player(this, 200, 300, 0, 0, 1, 0, 1, 0);
        //this.knight = new Knight(this, 800, 200, this.player);
        this.archerSkeleton = new Skeleton(this, 800, 300, this.player);     
        //this.poisonousGoblin = new PoisonousGoblin(this, 600, 300, this.player);
        //this.carnivorousPlant = new CarnivorousPlant(this, 500, 300, this.player);
        //this.magicSkeleton = new MagicSkeleton(this, 800, 300, this.player);
        //this.standardSkeleton = new StandardSkeleton(this, 800, 300, this.player);
        //this.lavaGolem = new LavaGolem(this, 800, 300, this.player);
       }
}