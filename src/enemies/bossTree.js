
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
        super(scene, x, y, target, 'bossTree');
        
        this.anims.create({
            key: 'spawn',
            frames: this.anims.generateFrameNumbers('bossTreeSpritesheet', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('bossTreeSpritesheet', { start: 6, end: 11 }),
            frameRate: 5,
            repeat: -1
        });

        this.play('idle');

        new MovingRoot(scene, this.x, this.y + 10, target, false, 1);

        new SurpriseRoot(scene, target.x - 20, target.y, target, false, 1);
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