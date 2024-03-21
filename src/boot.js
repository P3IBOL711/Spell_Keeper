import Phaser from 'phaser'
import player from '../assets/cSprites/characters/Mage_Walking.png'
import knight from '../assets/armory/sprites/knight/knight_spritesheet.png'
import skeleton from '../assets/armory/sprites/skeleton/skeleton_spritesheet.png'
import room from '../assets/armory/sprites/Hab_Prueba.png'
import arrow from '../assets/armory/sprites/arrow/arrow.png'
import Fireball from '../assets/cSprites/fireball_spritesheet.png'
import font from 'url:../assets/fonts/VT323Regular.ttf'

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
    this.load.spritesheet('fireball_spritesheet', Fireball, { frameWidth: 32, frameHeight: 32 });

    // Background
    let background = this.add.graphics();
    background.fillStyle(0x322653, 1);
    // 363062
    background.fillRect(0, 0, 1000, 600);
    
    // Loading bar 
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x9EC8B9, 0.8);
    progressBox.fillRect(340, 270, 320, 50);

    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0x9EC8B9, 1);
      progressBar.fillRect(350, 280, 300 * value, 30);
      percentText.setText(parseInt(value * 100) + '%');
    });
                
    this.load.on('fileprogress', function (file) {
      console.log(file.src);
    });
    this.load.on('complete', function () {
      console.log('complete');
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
    });

    // Loading bar text
    this.loadFont('pixelFont', font);
    let loadingText = this.add.text(420, 215, 'Loading...', { fontFamily: 'pixelFont', fontSize: 40, color: '#9EC8B9'});

    // Percent bar text
    let percentText = this.add.text(485, 320, '0%', { fontFamily: 'pixelFont', fontSize: 24, color: '#9EC8B9'});
  }

  loadFont(name, url) {
    let newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('mainMenu');
  }
}