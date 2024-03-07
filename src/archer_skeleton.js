import Phaser from 'phaser'
import HitBox from './hitbox';
import Enemy from './enemy';
import Arrow from './arrow';

/**
 * Clase que representa un enemigo del juego.
 */
export default class Skeleton extends Enemy {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
    */

    constructor(scene, x, y, target) {
        super(scene, x, y, 'skeleton');
        
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('skeleton_spritesheet', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('skeleton_spritesheet', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('skeleton_spritesheet', { start: 8, end: 10 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('skeleton_spritesheet', { start: 11, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.timerAttack = this.scene.time.addEvent({
            delay: 1000,
            callback: this.onTimerAttack,
            callbackScope: this,
            loop: true
        });

        this.timerAttack.paused = true;

        this.setScale(3);

        this.speed = 20;

        this.target = target;

        this.body.setSize(this.width * 0.45, this.height * 0.85, true);

        // SE PODRIA MEJORAR CON this.event.on(animationstart) PERO NO SABEMOS HACERLO
        this.on(Phaser.Animations.Events.ANIMATION_START, () => {
            if (this.anims.getName() === 'attack'){

            }
        })

        this.on(Phaser.Animations.Events.ANIMATION_STOP, () => {
            if (this.anims.getName() === 'attack'){
               
            }
        })

    }

    receiveDamage(damage){
        this.life -= damage;
        if (this.life <= 0){
            this.play('die', true);
            this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.destroy(true);
            });
        }
    }

    onTimerAttack () {
        this.play('idle', true);
        this.stop();
        new Arrow(this.scene, this.x, this.y, this.target, this.damage);
        this.chain(['attack', 'idle']);
        this.body.setVelocity(0);
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
        this.setFlipX(this.body.velocity.x < 0 || this.target.x < this.x);
        // Preguntar si podría ser mas eficiente
        if(this.flipX)
            this.body.setOffset(this.width * 0.38, this.height * 0.32);
        else
            this.body.setOffset(this.width * 0.40, this.height * 0.32);

        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) > 300){
            this.timerAttack.paused = true;
            
            this.play('walking', true);
            this.scene.physics.moveToObject(this, this.target, this.speed);
        }
        else {
            // creáis la zone de ataque
            // cambiáis la animación (que ya está)      
            this.timerAttack.paused = false;

        }

    }

}