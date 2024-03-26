import Phaser from 'phaser'
import HitBox from '../hitbox';
import Enemy from './enemy';

/**
 * Clase que representa un enemigo del juego.
 */
export default class StandardSkeleton extends Enemy {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
    */

    constructor(scene, x, y, target) {
        super(scene, x, y, 'standardSkeleton');

        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('standardSkeletonSpritesheet', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('standardSkeletonSpritesheet', { start: 8, end: 10 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('standardSkeletonSpritesheet', { start: 16, end: 20 }),
            frameRate: 5,
            repeat: 0
        });

        this.timerAttack = this.scene.time.addEvent({
            delay: 1500,
            callback: this.onTimerAttack,
            callbackScope: this,
            loop: true
        });

        this.timerAttack.paused = true;

        this.setScale(3);

        this.speed = 40;

        this.target = target;

        this.life = 5;

        this.damage = 1;

        this.body.setSize(this.width * 0.4, this.height * 0.85, true);

        // SE PODRIA MEJORAR CON this.on(animationstart) PERO NO SABEMOS HACERLO
        this.on(Phaser.Animations.Events.ANIMATION_START, () => {
            if (this.anims.getName() === 'attack'){
                this.body.setVelocity(0);
                this.attackZone = new HitBox(this.scene, this.x + (this.flipX ? -65 : 65), this.y - 10, 60, 120, this.target, this.damage);
            }
        })

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if (this.anims.getName() === 'attack'){
                this.attackZone.destroy(true);
                this.play('walking', true)
                this.scene.physics.moveToObject(this, this.target, this.speed);
            }
        })

        this.on(Phaser.Animations.Events.ANIMATION_STOP, () => {
            if (this.anims.getName() === 'attack'){
                this.attackZone.destroy(true);
                this.play('walking', true)
            }
            else if(this.anims.getName() === 'walking'){
                this.play('walking', true);
            }
        })

    }

    doSomethingVerySpecificBecauseYoureMyBelovedChild() {
        this.scene.time.removeEvent(this.timerAttack);
    }

    receiveDamage(damage){
        super.receiveDamage(damage);
        if (this.life <= 0){
            this.timerAttack.paused = true;
        }
    }
    
    onTimerAttack(){
        this.play('attack');
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
        // Preguntar si podría ser mas eficiente
        if (this.life > 0) {
            this.body.setOffset(this.width * (this.flipX ? 0.4 : 0.42), this.height * 0.34);

            if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) >= 100){
                this.timerAttack.paused = true;
                this.playAfterRepeat('walking', true);
                this.scene.physics.moveToObject(this, this.target, this.speed);
            }
            else {
                // creáis la zone de ataque
                // cambiáis la animación (que ya está)
                this.timerAttack.paused = false;
                this.playAfterRepeat('walking');
            } 
        }
    }

}