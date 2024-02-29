import Phaser from 'phaser'

/**
 * Clase que representa un enemigo del juego.
 */
export default class HitBox extends Phaser.GameObjects.Zone {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
    */

    constructor(scene, x, y, width, height, player, damage) {
        super(scene, x, y, width, height);
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.scene.physics.add.overlap(this, player, (player) => {
            //player.receiveDamage(damage);
            console.log('overlapped');
        });
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    // preUpdate(t, dt) {
    //     // IMPORTANTE: Si no ponemos esta instrucción y el sprite está animado
    //     // no se podrá ejecutar la animación del sprite. 
    //     super.preUpdate(t, dt);
        

    // }

}