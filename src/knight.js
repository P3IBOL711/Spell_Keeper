import Phaser from 'phaser'

/**
 * Clase que representa un enemigo del juego.
 */
export default class Knight extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, target) {
        super(scene, x, y, 'knight');

        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('knight_walk_spritesheet', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('knight_attack_spritesheet', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // Velocidad 0 por defecto
        this.speed = 20;

        this.target = target;
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
        
        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) >= 50){
            this.play('walking', true);
            this.scene.physics.moveToObject(this, this.target, this.speed);
        }
        else {
            this.play('attack', true);
            this.body.setVelocity(0);
        }

    }

}