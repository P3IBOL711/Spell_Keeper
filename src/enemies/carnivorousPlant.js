import Phaser from 'phaser'
import HitBox from '../hitbox';
import Enemy from './enemy';
import GreenPoisonBall from '../projectiles/greenPoisonBall';

/**
 * Clase que representa un enemigo del juego.
 */
export default class CarnivorousPlant extends Enemy {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
    */

    constructor(scene, x, y, target) {
        super(scene, x, y, 'carnivorous_plant');
        
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('carnivorousPlantSpritesheet', { start: 0, end: 3 }),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'attack1',
            frames: this.anims.generateFrameNumbers('carnivorousPlantSpritesheet', { start: 7, end: 12 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack2',
            frames: this.anims.generateFrameNumbers('carnivorousPlantSpritesheet', { start: 14, end: 20 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('carnivorousPlantSpritesheet', { start: 21, end: 26 }),
            frameRate: 5,
            repeat: 0
        });

        this.timerAttack = this.scene.time.addEvent({
            delay: 900,
            callback: this.onTimerAttack,
            callbackScope: this,
            loop: true
        });

        // SE PODRIA MEJORAR CON this.on(animationstart) PERO NO SABEMOS HACERLO
        this.on(Phaser.Animations.Events.ANIMATION_START, () => {
            if (this.anims.getName() === 'attack1'){
                this.attackZone = new HitBox(this.scene, this.x + (this.flipX ? -65 : 65), this.y - 10, 60, 120, this.target, this.damage);
            }
        })

        this.on(Phaser.Animations.Events.ANIMATION_STOP, () => {
            if (this.anims.getName() === 'attack1'){
                this.attackZone.destroy(true);
            }
        })

        this.timerAttack.paused = true;

        this.setScale(3);

        this.speed = 0;

        this.target = target;

        this.body.setSize(this.width * 0.7, this.height * 1.1, true);
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

    onTimerAttack () {
        this.play('idle', true);
        this.stop();
        new GreenPoisonBall(this.scene, this.x - 30, this.y - 80, this.target);
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
        if (this.life > 0){
            this.setFlipX(this.body.velocity.x < 0 || this.target.x < this.x);
            // Preguntar si podría ser mas eficiente
            if(this.flipX)
                this.body.setOffset(this.width * 0.39, this.height * 0.225);
            else
                this.body.setOffset(this.width * 0.44, this.height * 0.225);

            let dist = Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y);

            if (dist > 300){
                this.timerAttack.paused = true;
                
                this.play('idle', true);
            }
            else if (dist > 120 && dist <= 300){
                // creáis la zone de ataque
                // cambiáis la animación (que ya está)

                this.timerAttack.paused = false;
                this.play('attack2', true);
            }
            else{
                this.play('attack1', true);
            }
        }

    }

}