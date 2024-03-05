import Phaser from 'phaser'
import player from '../assets/cSprites/characters/Mage_Walking.png'
import knight from '../assets/armory/sprites/knight/knight_spritesheet.png'
import skeleton from '../assets/armory/sprites/skeleton/skeleton_spritesheet.png'
import room from '../assets/armory/sprites/Hab_Prueba.png'
import arrow from '../assets/armory/sprites/arrow/arrow.png'
/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
    
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    this.load.spritesheet('player_spritesheet', player, { frameWidth: 32, frameHeight: 32 });
    this.load.image('escenaPrueba', room);
    this.load.image('arrow', arrow);
    this.load.spritesheet('knight_spritesheet', knight, { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('skeleton_spritesheet', skeleton, { frameWidth: 64, frameHeight: 64 });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('armeriaPrueba');
  }
}