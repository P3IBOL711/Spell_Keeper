import Phaser from 'phaser'

import room from '../../assets/armory/sprites/Hab_Prueba.png'
//player assets
import player from '../../assets/cSprites/characters/Mage_Walking.png'
import deadPlayer from '../../assets/cSprites/characters/Mage_Dead.png'
import shield from '../../assets/cSprites/characters/Escudo.png'
import sombreraco from '../../assets/cSprites/characters/SombreroPajerini.png'

//Enemies assets
import inv from '../../assets/gardens/sprites/InvernaderoAbierto.png'
import playerIdle from '../../assets/cSprites/characters/Mage_Idle.png'
import playerDead from '../../assets/cSprites/characters/Mage_Dead.png'
import knight from '../../assets/armory/sprites/knight/knight_spritesheet.png'
import skeleton from '../../assets/armory/sprites/skeleton/skeleton_spritesheet.png'
import PoisonousGoblin from '../../assets/gardens/sprites/goblin/poisonous_goblin_spritesheet.png'
import CarnivorousPlant from '../../assets/gardens/sprites/carnivorous_plant/carnivorous_plant_spritesheet.png'
import MagicSkeleton from '../../assets/library/sprites/skeleton/skeleton_3_spritesheet.png'
import StandardSkeleton from '../../assets/library/sprites/skeleton/skeleton_1_spritesheet.png'
import LavaGolem from '../../assets/throne_room/sprites/lava_golem/golem_spritesheet.png'
import Slime from '../../assets/gardens/sprites/slime/slime_spritesheet.png'
import Book from '../../assets/library/sprites/book/book_spritesheet_1.png'
import PurpleMagicBall from '../../assets/cSprites/purple_magic_ball_spritesheet.png'
import GreenPoisonBall from '../../assets/cSprites/green_poison_spritesheet.png'
import arrow from '../../assets/armory/sprites/arrow/arrow.png'
import Spear from '../../assets/cSprites/weapons/Spear.png'
import Knife from '../../assets/cSprites/weapons/knife.png'

//Weapon assets
import dagger from '../../assets/cSprites/weapons/02.png'
import Fireball from '../../assets/cSprites/weapons/fireball_spritesheet.png'
import Lighting from '../../assets/cSprites/weapons/LightingEffect.png'
import iceEffects from '../../assets/cSprites/weapons/iceEffect.png'
import puddleEffects from '../../assets/cSprites/weapons/puddlePlaceholder.png'
import iceStaff from '../../assets/cSprites/weapons/iceStaff.png'
import fireStaff from '../../assets/cSprites/weapons/fireStaff2.png'
import poisonStaff from '../../assets/cSprites/weapons/poisonStaff2.png'
import espadaMortal from '../../assets/cSprites/weapons/espadaCheta.png'
import Bullet from '../../assets/cSprites/Bullet.png'
import Shotgun from '../../assets/cSprites/weapons/Escopeta.png'
import Thompson  from '../../assets/cSprites/weapons/Thompson.png'
import MagicSword from '../../assets/cSprites/weapons/magicSword.png'
import MagicKnife from '../../assets/cSprites/weapons/MagicKnife.png'
import magicBullet from '../../assets/cSprites/weapons/magicBullet_effects.png'
import DrainSword from '../../assets/cSprites/weapons/DrainSword.png'
import PoisonDagger from '../../assets/cSprites/weapons/PoisonDagger.png'
import ultimateWeapon from '../../assets/cSprites/weapons/UltimateHoe.png'

//Item assets
import healingHeart from '../../assets/cSprites/items/healingHeart.png'
import halfHealingHeart from '../../assets/cSprites/items/halfHealingHeart.png'
import manaPotion from '../../assets/cSprites/items/PotionBlue.png'


//UI assets
import font from 'url:../../assets/fonts/VT323Regular.ttf'
import fullHeart from '../../assets/HUD/ui-heart-full.png'
import halfHeart from '../../assets/HUD/half-ui-heart.png'
import emptyHeart from '../../assets/HUD/ui-heart-empty.png'
import Fire from '../../assets/misc/fire.png'
// prueba
import manaBar from '../../assets/HUD/manabar.png'
import mainMana from '../../assets/HUD/main_mana.png'
import finalMana from '../../assets/HUD/final_mana.png'
import Uikey from '../../assets/HUD/key_32x32_24f.png';

import chest from '../../assets/armory/sprites/chests.png'

// Controls Menu
import ControlsBackground from '../../assets/controlsMenu/background.png'
import wKey from '../../assets/controlsMenu/w.png'
import aKey from '../../assets/controlsMenu/a.png'
import sKey from '../../assets/controlsMenu/s.png'
import dKey from '../../assets/controlsMenu/d.png'
import homeButton from '../../assets/controlsMenu/home.png'
import leftClick from '../../assets/controlsMenu/leftClick.png'
import rightClick from '../../assets/controlsMenu/rightClick.png'
import TitleDecoration from  '../../assets/mainTitle.png'
import fullScreenButton from '../../assets/main_menu/full_screen_icon.png'
import normalScreenButton from '../../assets/main_menu/normal_screen_icon.png'

//Music
import libLoop from 'url:../../assets/sound/music/libloop.wav'
import libIntro from 'url:../../assets/sound/music/libintro.wav'
import tutloop from 'url:../../assets/sound/music/tutloop.wav'

//Sfx
import playerhit from 'url:../../assets/sound/effects/playerhit.wav'


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
    //Player
    this.load.spritesheet('player_spritesheet', player, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('player_idle',playerIdle, { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('player_dead',playerDead, { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('playerDying_spritesheet', deadPlayer, { frameWidth: 32, frameHeight: 32 });
    this.load.image('escudo', shield);
    this.load.image('sombreroPajero', sombreraco);
    this.load.image('escenaPrueba', room);
    this.load.image('inv',inv)
    // Controls Menu
    this.load.image('controlsBackground', ControlsBackground);
    this.load.image('wKey', wKey);
    this.load.image('aKey', aKey);
    this.load.image('sKey', sKey);
    this.load.image('dKey', dKey);
    this.load.image('homeButton', homeButton);
    this.load.image('leftClick', leftClick);
    this.load.image('rightClick', rightClick);
    this.load.image('titleDecoration', TitleDecoration)
    this.load.spritesheet('fire',Fire,{ frameWidth: 32, frameHeight: 32 })

    //Weapons
    this.load.image('dagger', dagger);
    this.load.image('drainsword',DrainSword)
    this.load.image('fireStaff',fireStaff);
    this.load.image('spear',Spear)
    this.load.image('magicknife',MagicKnife)
    this.load.spritesheet('fireball_spritesheet', Fireball, { frameWidth: 32, frameHeight: 32 });
    this.load.image('iceStaff', iceStaff);
    this.load.spritesheet('ice_spritesheet', iceEffects, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('puddle_spritesheet', puddleEffects, { frameWidth: 32, frameHeight: 32 });
    this.load.image('poisonStaff',poisonStaff);
    this.load.spritesheet('lighting_spritesheet', Lighting, { frameWidth: 64, frameHeight:64 });
    this.load.image('espadaCheta', espadaMortal);
    this.load.image('hoe', ultimateWeapon);
    this.load.spritesheet('magicBullet_spritesheet', magicBullet, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('shotgun',Shotgun,{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('thompson',Thompson,{ frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('ironbullet',Bullet,{ frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('knife',Knife,{ frameWidth: 12, frameHeight: 5 });
    this.load.image('poisondagger',PoisonDagger);
    this.load.image('magicSword', MagicSword);

    //Items
    this.load.spritesheet('chest',chest,{frameWidth: 32, frameHeight:32});
    this.load.image('healingHeart', healingHeart);
    this.load.image('halfHealingHeart', halfHealingHeart);
    this.load.image('potionOfMana', manaPotion);

    //Enemies
    this.load.spritesheet('arrow', arrow, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('knight_spritesheet', knight, { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('skeleton_spritesheet', skeleton, { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('poisonousGoblinSpritesheet', PoisonousGoblin, { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('carnivorousPlantSpritesheet', CarnivorousPlant, { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('magicSkeletonSpritesheet', MagicSkeleton, { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('lavaGolemSpritesheet', LavaGolem, { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('slimeSpritesheet', Slime, { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet('bookSpritesheet', Book, {frameWidth: 64, frameHeight: 64})
    this.load.spritesheet('standardSkeletonSpritesheet', StandardSkeleton, { frameWidth: 72, frameHeight: 72 });
    this.load.spritesheet('purpleMagicBallSpritesheet', PurpleMagicBall, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('greenPoisonBallSpritesheet', GreenPoisonBall, { frameWidth: 32, frameHeight: 32 });

    //UI/HUD
    this.load.image('ui-heart-full', fullHeart);
    this.load.image('half-ui-heart', halfHeart);
    this.load.image('ui-heart-empty', emptyHeart);
    this.load.image('manaBar', manaBar);
    this.load.image('mainMana', mainMana);
    this.load.image('finalMana', finalMana);
    this.load.spritesheet('key', Uikey, { frameWidth: 32, frameHeight: 32 });

    this.load.audio('tutloop',tutloop)
    this.load.audio('libloop', libLoop)
    this.load.audio('libintro', libIntro)

    this.load.audio('playerhit',playerhit)

   

    // Background
    let background = this.add.graphics();
    background.fillStyle(0xad88c6, 1);
    // 363062
    background.fillRect(0, 0, 1000, 600);
    
    // Loading bar 
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x8f3ea9, 0.8);
    progressBox.fillRect(340, 270, 320, 50);

    this.load.on('progress', function (value) {
      progressBar.clear();
      progressBar.fillStyle(0x8f3ea9, 1);
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
    let loadingText = this.add.text(420, 215, 'Loading...', { fontFamily: 'pixelFont', fontSize: 40, color: '#5e1675ff'});

    // Percent bar text
    let percentText = this.add.text(485, 320, '0%', { fontFamily: 'pixelFont', fontSize: 24, color: '#5e1675ff'});

    // Full screen button
    this.load.image('fullScreenButton', fullScreenButton);
    this.load.image('normalScreenButton', normalScreenButton);
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