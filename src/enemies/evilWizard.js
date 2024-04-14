
import Phaser from 'phaser'
import Enemy from './enemy'
/**
 * Clase que representa un enemigo del juego.
 */
export default class EvilWizard extends Enemy {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, target) {
        super(scene, x, y, target, 'evilWizard', 10000);
        
        this.anims.create({
            key: 'spawn',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 0, end: 19 }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 20, end: 25 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack1',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 26, end: 35 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack2',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 36, end: 43 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack3',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 45, end: 61 }),
            frameRate: 10,
            repeat: -1
        });

        this.play('attack3');
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