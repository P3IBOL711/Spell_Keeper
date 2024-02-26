import Phaser from 'phaser'


import player from '../assets/sprites/player.png'
import knight_walk from '../assets/armory/sprites/knight/knight_walk-sheet.png'
import knight_attack from '../assets/armory/sprites/knight/knight_attack_01-sheet.png'
import room from '../assets/armory/sprites/Hab_Prueba.png'
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
    this.load.image('player', player);
    this.load.image('escena', room);
    this.load.spritesheet('knight_walk_spritesheet', knight_walk, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('knight_attack_spritesheet', knight_attack, { frameWidth: 50, frameHeight: 62 });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('level');
  }
}