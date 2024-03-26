
import Phaser from 'phaser'
import Enemy from './enemy'

/**
 * Clase que representa un enemigo del juego.
 */
export default class DistanceEnemy extends Enemy {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, target, image, attackDelay) {
        super(scene, x, y, target, image);

        this.timerAttack = this.scene.time.addEvent({
            delay: attackDelay,
            callback: this.onTimerAttack,
            callbackScope: this,
            loop: true
        });

        this.timerAttack.paused = true;

        this.on(Phaser.Animations.Events.ANIMATION_START, () => {
            if(this.life > 0){
                if (this.anims.getName() === 'attack'){
                    this.body.setVelocity(0);
                    this.spawnProjectile();
                }
            }
            
        })

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if(this.life > 0){
                if (this.anims.getName() === 'attack'){
                    this.play('walking', true)
                    this.scene.physics.moveToObject(this, this.target, this.speed);
                }
            }
        })

        this.on(Phaser.Animations.Events.ANIMATION_STOP, () => {
            if (this.life > 0){
                if (this.anims.getName() === 'attack'){
                    this.play('walking', true)
                }
                else if(this.anims.getName() === 'walking'){
                    this.play('walking', true);
                }
            }
        })
    }

    spawnProjectile(){}

    doSomethingVerySpecificBecauseYoureMyBelovedChild() {
        this.scene.time.removeEvent(this.timerAttack);
    }


    receiveDamage(damage){
        super.receiveDamage(damage);
        if (this.life <= 0){
            this.timerAttack.paused = true;
        }
    }

    onTimerAttack () {
        this.play('attack')
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
        if (this.life > 0){
            if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) > 300){
                this.timerAttack.paused = true;
                
                this.play('walking', true);
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