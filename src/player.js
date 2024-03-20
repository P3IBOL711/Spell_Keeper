import Bullet from './bullet.js'

import Phaser from 'phaser'
import Reticle from './reticle.js';
import PlayerHitBox from './playerHitbox.js';

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

    constructor(scene, x, y, lifeMod, manaMod, weaponMult, moveMod, moveMult, luckMod, MeleeWeaponArray, RangedWeaponArray, ActMelIndex, ActRangIndex) {
        super(scene, x, y, 'player');
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(3);

        this.body.setSize(this.width * 0.4, this.height * 0.65, true);
        this.body.setOffset(this.width * 0.3, this.height * 0.35);
        /****ESTADISTICAS****/
        //CAPADO inferiormente a 1 y superiormente a 10, cada numero son 2 golpes
        this.lifeModifier = lifeMod;
        this.life = 3 + this.lifeModifier;

        //CAPADO inferiormente a 10 y superiormente a 1000
        //Cuando no se tiene mana suficiente para hacer el ataque, se hace igual con una potencia proporcional al mana gastado de lo que cuesta el ataque
        this.manaModifier = manaMod;
        this.mana = 250 + this.manaModifier;

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
        this.meleeMode = false;
        //Interacciones
        this.q = this.scene.input.keyboard.addKey('Q');
        this.e = this.scene.input.keyboard.addKey('E');
        this.f = this.scene.input.keyboard.addKey('F');

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
                if(this.meleeIndex <= 0)
                    this.meleeIndex = this.meeleWeapons.length() - 1;
            }
            else {
                this.rangedIndex = this.rangedIndex - 1;
                if(this.rangedIndex <= 0)
                    this.rangedIndex = this.rangedWeapons.length() - 1;
            }
        });

        this.e.on('down', () => {
            if(this.meleeMode) {
                this.meleeIndex = (this.meleeIndex + 1) % this.meeleWeapons.length();
            }
            else {
                this.rangedIndex = (this.rangedIndex + 1) % this.rangedWeapons.length();
            }
        });

        //Cursor de ataque y eventos del cursor (faltan los hover para cambiar la textura del raton)
        this.scene.input.on('pointerup', pointer =>  {
            if(pointer.rightButtonReleased()) {
                if(this.meleeMode)
                    this.meleeMode = false;
                else
                    this.meleeMode = true;
            }
        });

        this.scene.input.on('pointerdown', () => {
            if(this.meleeMode)
                this.meeleAttack();
            else
                this.rangedAttack();
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

        /*
        //BOTON DEL ESCUDO, IMPLEMENTAR
        if(this.cursors.shift.isDown){

        }
        */
    }

    /**NOTAS PARA EJECUTAR LOS ATAQUES:
     * Tienes dos arrays que son los "inventarios de armas", segun el tipo de ataque se pilla un array u otro y haces array[index].attack(parametros)
     */
    meeleAttack() {
        //Animacion de ataque
        //this.play();
        if(this.direction === 'left') {
            new PlayerHitBox(this.scene, this.x - 30, this.y, 64, 64, 1);
        }
        else if(this.direction === 'right') {
            new PlayerHitBox(this.scene, this.x + 30, this.y, 64, 64, 1);
        }
        else if(this.direction === 'up') {
            new PlayerHitBox(this.scene, this.x, this.y - 30, 64, 64, 1);
        }
        else if(this.direction === 'down') {
            new PlayerHitBox(this.scene, this.x, this.y + 30, 64, 64, 1);
        }
    }

    rangedAttack() {
        if (this.active === false) { return; }
        new Bullet(this.scene, this.x, this.y, this.reticle, true, 1);
    }

    /**Funcion que se llama cuando el jugador recibe daño */
    receiveDamage(damage) {
        this.life -= damage;
        if(this.life <= 0) {
            //Animacion de muerte
            this.scene.scene.start('end');
        }
    }
}
