import Phaser from 'phaser'
import HitBox from './hitbox';

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
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

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

        this.setScale(3);

        this.speed = 20;

        this.target = target;

        this.body.setSize(this.width * 0.4, this.height * 0.9, true);
        
        // SE PODRIA MEJORAR CON this.on(animationstart) PERO NO SABEMOS HACERLO
        this.on(Phaser.Animations.Events.ANIMATION_START, () => {
            if (this.anims.getName() === 'attack'){
                if (this.flipX)
                    this.attackZone = new HitBox(this.scene, this.x - 25, this.y - 25, 60, 100, this.target, this.damage);
                else
                    this.attackZone = new HitBox(this.scene, this.x + 25, this.y + 25, 60, 100, this.target, this.damage);
            }
        })

        this.on(Phaser.Animations.Events.ANIMATION_STOP, () => {
            if (this.anims.getName() === 'attack'){
                this.attackZone.destroy(true);
            }
        })

        /* PREGUNTAS
            - Como funciona el offset
            - Como cuadrar los sprites cuando cambia la animacion a ataque      
        */
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

            this.setFlipX(this.body.velocity.x < 0);

            this.play('walking', true);
            this.scene.physics.moveToObject(this, this.target, this.speed);
        }
        else {
            // creáis la zone de ataque

            // cambiáis la animación (que ya está)
            this.play('attack', true);
            this.body.setVelocity(0);
            
        }

    }

}