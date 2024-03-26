import Phaser from 'phaser';

import Reticle from './reticle.js';
import HealthDisplay from './HUD/healthDisplay.js';
import ManaDisplay from './HUD/manaDisplay.js';
import weaponDisplay from './HUD/weapondisplay.js';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */

    constructor(scene, x, y, life, mana, lifeMod, manaMod, weaponMult, moveMod, moveMult, luckMod, MeleeWeaponArray, RangedWeaponArray, ActMelIndex, ActRangIndex, lastWeaponUsed) {
        super(scene, x, y, 'player');
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(3);

        this.body.setSize(this.width * 0.4, this.height * 0.65, true);
        this.body.setOffset(this.width * 0.3, this.height * 0.35);

        /****ESTADISTICAS****/
        //CAPADO inferiormente a 1 y superiormente a 20, cada numero son 2 golpes
        this.initialLife = 10; 
        this.lifeModifier = lifeMod;
        this.maxLife = this.initialLife + this.lifeModifier;
        this.actualLife = (life === 0) ? this.initialLife : life;

        //CAPADO inferiormente a 10 y superiormente a 1000
        //Cuando no se tiene mana suficiente para hacer el ataque, se hace igual con una potencia proporcional al mana gastado de lo que cuesta el ataque
        this.manaModifier = manaMod;
        this.initialMana = 250;
        this.maxMana = this.initialMana + this.manaModifier;
        this.actualMana = (mana === 0) ? this.initialMana : mana;

        this.weaponMultiplier = weaponMult;

        //CAPADO, definir caps
        this.MovSpeedModifier = moveMod;
        this.MovSpeedMultiplier = moveMult;
        this.MovSpeed = (100 + this.MovSpeedModifier)*this.MovSpeedMultiplier;

        this.hiddenLuckModifier = luckMod;
        this.luck = 5;
        this.reticle = new Reticle(this.scene, x, y - 30);

        /****CONTROLES****/
        //Direcciones
        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.s = this.scene.input.keyboard.addKey('S');
        this.d = this.scene.input.keyboard.addKey('D');
        this.direction = null;
        //Interacciones
        this.q = this.scene.input.keyboard.addKey('Q');
        this.e = this.scene.input.keyboard.addKey('E');
        this.f = this.scene.input.keyboard.addKey('F');
        this.shift = this.scene.input.keyboard.addKey('SHIFT');
        this.meleeMode = true;
        this.canAttack = true;
        this.canBeDamaged = true;
        this.shieldCooldown = 0; 
        this.shieldUptime = 0;

        /****ANIMACIONES****/
        this.anims.create({
            key:'idle',
            frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'walkDown',
            frames: this.anims.generateFrameNumbers('player_spritesheet',{ start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'walkUp',
            frames: this.anims.generateFrameNumbers('player_spritesheet',{ start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'walkRight',
            frames: this.anims.generateFrameNumbers('player_spritesheet',{ start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        //Interacciones del teclado
        this.q.on('down', () => {
            if(this.meleeMode) {
                this.meleeIndex = this.meleeIndex - 1;
                if(this.meleeIndex < 0)
                    this.meleeIndex = this.meeleWeapons.length - 1;
                this.updatedWeapon(this.meleeIndex);
            }
            else {
                this.rangedIndex = this.rangedIndex - 1;
                if(this.rangedIndex < 0)
                    this.rangedIndex = this.rangedWeapons.length - 1;
                this.updatedWeapon(this.rangedIndex);
            }
        });

        this.e.on('down', () => {
            if(this.meleeMode) {
                this.meleeIndex = (this.meleeIndex + 1) % this.meeleWeapons.length;
                this.updatedWeapon(this.meleeIndex);
            }
            else {
                this.rangedIndex = (this.rangedIndex + 1) % this.rangedWeapons.length;
                this.updatedWeapon(this.rangedIndex);
            }
        });

        //Esucdo del jugador, falta añadir la animacion del escudo
        this.shift.on('down', () => {
            if(this.shieldCooldown === 0) {
                this.canBeDamaged = false;
                this.scene.time.addEvent({
                    delay: 3000,
                    callback: shieldOnCD,
                    callbackScope: this
                });
            }
        });

        //Cursor de ataque y eventos del cursor (faltan los hover para cambiar la textura del raton)
        this.scene.input.mouse.disableContextMenu();
        this.scene.input.on('pointerup', pointer =>  {
            if(pointer.rightButtonReleased()) {
                if(this.meleeMode) {
                    this.meleeMode = false;
                    this.updatedWeapon(this.rangedIndex);
                }
                else {
                    this.meleeMode = true;
                    this.updatedWeapon(this.meleeIndex);
                }
            }
        });

        this.scene.input.on('pointerdown', () => {
            this.playerAttacks();
        });

        this.scene.input.on('pointermove', () => {
                this.reticle.x = this.scene.input.activePointer.worldX;
                this.reticle.y = this.scene.input.activePointer.worldY;
        });

        /**ARRAYS DE OBJETOS Y ARMAS*/
        //Nota: ver como se pasa entre las escenas
        this.meeleWeapons = MeleeWeaponArray;
        this.rangedWeapons = RangedWeaponArray;
        this.meleeIndex = ActMelIndex;
        this.rangedIndex = ActRangIndex;
        this.weaponDelay = 0;
        this.equipedWeapon = lastWeaponUsed;


        /**RELATIVO A LA ESCENA**/
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);  
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        
        this.weaponDelay += dt;
        if(this.weaponDelay >= this.equipedWeapon.delay) {
            this.canAttack = true;
        }

        //MOVIMIENTO DEL JUGADOR
        let stopped = true;
        
        if(this.a.isDown) {
            this.direction = 'left';
            this.setFlipX(true);
            stopped=false;
            this.play('walkRight', true);
            this.body.setVelocityX(-this.MovSpeed);
        }
        else if(this.d.isDown) {
            this.direction = 'right';
            stopped=false;
            this.setFlipX(false);
            this.play('walkRight', true);
            this.body.setVelocityX(this.MovSpeed);
        }
        
        if(this.w.isDown){
            this.direction = 'up';
            stopped=false;
            this.play('walkUp', true);
            this.body.setVelocityY(-this.MovSpeed);
        }
        else if(this.s.isDown) {
            this.direction = 'down';
            stopped=false;
            this.play('walkDown', true);
            this.body.setVelocityY(this.MovSpeed);
        }

        if(stopped) {
            this.play('idle', true);
            this.body.setVelocity(0);
        }
    }

    /**NOTAS PARA EJECUTAR LOS ATAQUES:
     * Tienes dos arrays que son los "inventarios de armas", segun el tipo de ataque se pilla un array u otro y haces array[index].attack(parametros)
     */
    playerAttacks() {
        //Animacion de ataque
        //this.play();
        //Mientras se hace haces el ataque y luego se destruye el area
        if (this.active === false) { return; }
        this.equipedWeapon.attack(this.x, this.y, this.direction, this.reticle);
        this.canAttack = false;
    }

    /**Funcion que se llama cuando el jugador recibe daño */
    receiveDamage(damage) {
        if(this.canBeDamaged) {
            this.actualLife -= damage;
        
            this.scene.tweens.add({
                targets: this,
                alpha: 0,
                ease: Phaser.Math.Easing.Elastic.InOut,
                duration: 40, 
                repeat: 1,
                yoyo: true,
                onStart: () => {
                    this.setTint(0xff0000);
                },
                onComplete: () => {
                    this.clearTint();
                    this.setAlpha(1);
                }
            })
    
            if(this.life <= 0) {
                //Animacion de muerte
                this.scene.scene.start('end');
            }
        }
    }

    updatedWeapon(index) {
        if(this.meleeMode)
            this.equipedWeapon = this.meeleWeapons[index];
        else
            this.equipedWeapon = this.rangedWeapons[index];
    }

    takeMeleeWeapon(weapon) {
        this.meeleWeapons.push(weapon);
    }

    takeRangedWeapon(weapon) {
        this.rangedWeapons.push(weapon);
    }

    shieldOnCD() {
        this.shieldCooldown = 1;
        this.canBeDamaged = true;
        this.scene.time.addEvent({
            delay: 10000,
            callback: shieldOffCD,
            callbackScope: this
        });
    }

    shieldOffCD() {
        this.shieldCooldown = 0;
    }

    createHUDElement(objectName, obj) {
        switch(objectName) {
            case 'LifeBar':
                this.playerLifeBar = new HealthDisplay(this, obj.x, obj.y, obj.width, obj.height, this.maxLife);
                break;
            case 'ManaBar':
                this.playerManaBar = new ManaDisplay(this.scene, obj.x, obj.y, obj.width, obj.height, this.initialMana, this.maxMana);
                break;
            case 'Money':
                break;
            case 'Keys':
                break;
            case 'Active':
                break;
            case 'ArmaEquipada':
                this.displayEquipedWeapon = new weaponDisplay(this.scene, obj.x, obj.y, this.equipedWeapon);
                break;
            default:
                console.warn('Tipo de objeto no reconocido:', obj.name);
        }
    }
}
