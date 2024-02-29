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

        let attackZone = this.scene.add.zone(this.x, this.y, 60, 100);
        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, (anim, frame, sprite, frameKey) => {
            if (this.anims.getName() === 'attack'){
                this.scene.physics.world.enable(attackZone);
                if (this.flipX){
                    attackZone.x = this.x - 25;   
                }
                else{
                    attackZone.x = this.x + 25;                 
                }
                this.body.setSize(this.width * 0.2, this.height * 0.5, true);
                this.body.setOffset(25);
            }
            else if (this.anims.getName() === 'walking'){
                this.body.setSize(this.width * 0.4, this.height * 0.9, true);
                //attackZone.visible = false;
            }
        })

        this.scene.physics.add.overlap(attackZone, this.target, () =>{
            //console.log("overlapped");
            
        })
        /* PREGUNTAS
            - Como funciona el offset
            - Como desactivar la zona cuando no estas atacando
            - Como quitar vida y si es en overlap o collide
            - Como cuadrar los sprites cuando cambia la animacion a ataque*/
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
            if (this.body.velocity.x < 0)
                this.setFlipX(true);
            else 
                this.setFlipX(false);
            this.play('walking', true);
            this.scene.physics.moveToObject(this, this.target, this.speed);
        }
        else {
            this.play('attack', true);
            this.body.setVelocity(0);
        }

    }

}