import bullet from './bullet.js'

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
    constructor(scene, x, y, lifeMod, manaMod, weaponMult, moveMod, moveMult, luckMod) {
        super(scene, x, y, 'player');
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(3);

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
        this.w = this.scene.input.keyboard.addKey('W');
        this.a = this.scene.input.keyboard.addKey('A');
        this.s = this.scene.input.keyboard.addKey('S');
        this.d = this.scene.input.keyboard.addKey('D');
        this.meleeMode = true;

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

        //Cursor de ataque: NOTAS
        //SI QUIERES QUE SEA FUERA DE LA HITBOX DEL JUGADOR TIENES QUE CREAR UN CURSOR Y HACERLE EL LOCK Y QUE ESTE TENGA INTERACTIVE
        //PARA HACER QUE CUANDO PASE EL CURSOR POR ENICMA DE LOS ENEMIGOS CAMBIE DE TAMAÑO O INDICAR QUE SE PUEDE ATACAR, poner  a todo .setInteractive y hacer los callbacks

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

        this.playerBullets = this.scene.physics.add.group({ classType: bullet, runChildUpdate: true });

        /**Pointer Lock (o el intento de) */
        this.scene.input.on('mousedown', () => {
            this.scene.input.mouse.releasePointerLock();
        });

        this.scene.input.keyboard.on('keydown_Q', event => {
            if (this.scene.input.mouse.locked) { this.scene.input.mouse.releasePointerLock(); }
        }, 0);

        this.scene.input.on('pointermove', () => {
            //if (this.scene.input.mouse.locked)
            //{
                this.reticle.x = this.scene.input.activePointer.worldX;
                this.reticle.y = this.scene.input.activePointer.worldY;
            //}
        });


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
            this.setFlipX(true);
            stopped=false;
            this.play('walkRight', true);
            this.body.setVelocityX(-this.MovSpeed);
        }
        else if(this.d.isDown) {
            stopped=false;
            this.setFlipX(false);
            this.play('walkRight', true);
            this.body.setVelocityX(this.MovSpeed);
        }
        
        if(this.w.isDown){
            stopped=false;
            this.play('walkUp', true);
            this.body.setVelocityY(-this.MovSpeed);
        }
        else if(this.s.isDown) {
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

    //Metodo que ejecuta el ataque cuerpo a cuerpo con el arma melee 
    //equipada en ese momento
    meeleAttack() {
        //Va el inventario donde se escoje el arma correspondiente y hacew la animacion de ataque con el arma, si impacta hace daño
        //Animacion de ataque
        //this.play();
        //let hibox = new PlayerHitBox(this.scene, this.x - 30,  this.y + 20, 60, 120, 1);
    }

    //Metodo que ejecuta el ataque a distancia con el arma
    //equipada por el jugador en ese momento desde el inventario
    rangedAttack(){
        //Va al inventario y con el arma equipada en ese momento, el arma crea la hitbox del ataque correspondiente y lo lanza en la direccion del click
        if (this.active === false) { return; }

        // Get bullet from bullets group
        const bullet = this.playerBullets.get().setActive(true).setVisible(true);

        if (bullet)
        {
            bullet.fire(this, this.reticle);
            //this.scene.physics.add.collider(this.enemy, bullet, (enemyHit, bulletHit) => this.enemyHitCallback(enemyHit, bulletHit));
        }
    }

    /**Funcion que se llama cuando el jugador recibe daño */
    receiveDmg(damage) {
        this.life -= damage;
        if(this.life <= 0) {
            //Animacion de muerte
            this.destroy(true);
        }
    }
}
