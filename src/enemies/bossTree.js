
import Phaser from 'phaser'
import Enemy from './enemy'
import MovingRoot from '../projectiles/movingRoot'
import SurpriseRoot from '../projectiles/surpriseRoot';
/**
 * Clase que representa un enemigo del juego.
 */
export default class BossTree extends Enemy {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, target) {
        super(scene, x, y, target, 'bossTree', 10000);
        
        this.anims.create({
            key: 'spawn',
            frames: this.anims.generateFrameNumbers('bossTreeSpritesheet', { start: 0, end: 30 }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('bossTreeSpritesheet', { start: 31 , end: 38 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('bossTreeSpritesheet', { start: 31 , end: 42 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'redAttack',
            frames: this.anims.generateFrameNumbers('bossTreeSpritesheet', { start: 41 , end: 42 }),
            frameRate: 1,
            repeat: 100
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('bossTreeSpritesheet', { start: 62 , end: 75 }),
            frameRate: 5,
            repeat: 0
        });

        this.setScale(1.25);

        this.speed = 0;

        this.body.setSize(this.width, this.height, true);
        this.body.setOffset(this.width * 0.13, this.height * 0.14);

        this.play('spawn', true);

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if(this.life > 0){
                if (this.anims.getName() === 'attack') {
                    this.play("redAttack", true);
                }
                else if (this.anims.getName() === 'redAttack') {
                    this.play("walking", true);
                    this.attacking = false;
                }
            }
        });

        //new MovingRoot(scene, this.x, this.y + 10, target, false, 1);

        //new SurpriseRoot(scene, target.x - 20, target.y, target, false, 1);
    }

    onTimerAttack(){
        this.attacking = true;
        this.play("attack", true);
    }

    doSomethingVerySpecificBecauseYoureMyBelovedChild() {
    }


    receiveDamage(damage){
        super.receiveDamage(damage);
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

    flipEnemy(){}

    isProjectile(){
        return false;
    }
}