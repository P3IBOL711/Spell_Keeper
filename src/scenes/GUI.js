import Phaser from "phaser";

import Hud from '../../assets/HUD/HUD.json';
import healthDisplay from "../HUD/healthDisplay";
import manaDisplay from "../HUD/manaDisplay";
import keysDisplay from "../HUD/keysDisplay";
import activeDisplay from "../HUD/activeDisplay";
import weaponDisplay from "../HUD/weaponDisplay";
import Uikey from "../../assets/HUD/key_32x32_24f.png"

import { eventManager as hudEvents } from "../eventCenter";

export default class GUI extends Phaser.Scene {

    constructor() {
        super({ key: 'gui' });
    }

    preload() {
        this.load.tilemapTiledJSON('hud', Hud);
        this.load.spritesheet('key', Uikey, { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.map = this.make.tilemap({ 
            key: 'hud', 
            tileWidth: 32, 
            tileHeight: 32 
        });
        
        let objectLayer = this.map.getObjectLayer('HUD');
        objectLayer.objects.forEach(obj => {
            switch(obj.name) {
                case 'LifeBar':
                    //Valor inicial de la vida maxima: 10
                    this.playerLifeBar = new healthDisplay(this, obj.x, obj.y, 10);
                    break;
                case 'Manabar':
                    //Valores inciales del manaInicial y el manaMaximo: 250 y 500
                    this.playerManaBar = new manaDisplay(this, obj.x, obj.y, obj.width, obj.height, 250, 500);
                    break;
                case 'Keys':
                    //Valor inicial de las llaves: 0
                    this.playerKeysInfo = new keysDisplay(this, obj.x, obj.y, 'key', 0);
                    break;
                case 'Active':
                    //No tienes activo al principio
                    //this.playerActiveInfo = new activeDisplay();
                    break;
                case 'ArmaEquipada':
                    //Arma inicial: basicMelee
                    this.displayEquipedWeapon = new weaponDisplay(this, obj.x, obj.y, 'dagger');
                    break;
                default:
                    console.warn('Tipo de objeto no reconocido:', obj.name);
            }
        });

        hudEvents.on('updateHealth', (playerHealth) => {
            this.playerLifeBar.updateHealth(playerHealth);
        });

        hudEvents.on('updateMana', (playerManaStats) => {
            this.playerManaBar.setMana(playerManaStats[0], playerManaStats[1]);
        });

        hudEvents.on('updateDisplayedWeapon', (newWeapon) => {
            this.displayEquipedWeapon.updateDisplay(newWeapon);
        });

        hudEvents.on('updateMoney', (money) => {
            this.playerMoneyInfo.setMoney(money);
        });

        hudEvents.on('updateKeys', (keys) => {
            this.playerKeysInfo.setKeys(keys);
        });

        /**
         * hudEvents.on('changedActive', () => {
         * 
         * });
         * 
         * hudEvents.on('useActive', () => {
         * 
         * });
         */
    }
}