import Phaser from 'phaser'
import HitBox from './hitbox';

/**
 * Clase que representa un enemigo del juego.
 */
export default class Projectile extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
    */

    constructor(scene, x, y, image, targetEnemy, damage) {
        super(scene, x, y, image);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.scene.physics.add.overlap(this, this.scene.enemies, (projectile, enemy) => {
            if (targetEnemy){
                enemy.receiveDamage(damage)
                this.destroy();
            }
        });

        this.scene.physics.add.overlap(this, this.scene.player, (projectile, player) => {
            if (!targetEnemy){
                player.receiveDamage(damage)
                this.destroy();
            }
        });

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

        // on overlap(fn(con quien) { ... })
        
    }

}