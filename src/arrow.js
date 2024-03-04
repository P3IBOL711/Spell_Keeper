import Phaser from 'phaser'
import HitBox from './hitbox';
import Projectile from './projectile';

/**
 * Clase que representa una flecha del juego.
 */
export default class Arrow extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
    */

    constructor(scene, x, y, targetX, targetY) {
        super(scene, x, y, 'arrow');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setScale(2.5);

        this.speed = 20;

        this.targetX = targetX;

        this.targetY = targetY;

        this.rotation = Phaser.Math.Angle.Between(x, y, this.targetX, this.targetY);

        if (this.angle >= 45 && this.angle <= 135 || this.angle >= -135 && this.angle <= -45) {
            this.body.setSize(this.width * 0.1, this.height * 0.6, true);
        }
        else{
            this.body.setSize(this.width * 0.6, this.height * 0.1, true);
        }

        //this.setAngularVelocity(0);
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
        this.scene.physics.moveTo(this, this.targetX, this.targetY, this.speed);
    }

}