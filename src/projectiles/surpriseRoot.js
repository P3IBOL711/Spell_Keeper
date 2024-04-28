import Phaser from 'phaser'
import Projectile from './projectile';

/**
 * Clase que representa una flecha del juego.
 */
export default class SurpriseRoot extends Projectile {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
    */

    constructor(scene, x, y, targetEnemy, damage) {
        super(scene, x, y, 'surpriseRoot', targetEnemy, damage);

        //this.setScale(2.5);
        this.anims.create({
            key: 'normal',
            frames: this.anims.generateFrameNumbers('surpriseRootSpritesheet', { start: 0, end: 15 }),
            frameRate: 7,
            repeat: 5
        });

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if(this.anims.getName() === 'normal'){
                this.destroy();
            }
        });

        this.speed = 0;

        this.body.setVelocityY(this.speed);
    }

    impact(){
        super.impact();
        this.destroy();
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
    }

}