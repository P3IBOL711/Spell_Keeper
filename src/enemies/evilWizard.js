
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
        super(scene, x, y, target, 'evilWizard', 5000);
        
        this.anims.create({
            key: 'spawn',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 0, end: 19 }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 20, end: 25 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack1',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 26, end: 35 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'attack2',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 36, end: 43 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'attack3',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 44, end: 85 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 86, end: 96 }),
            frameRate: 8,
            repeat: 0
        });

        this.setScale(1.25);

        this.speed = 0;

        this.distanceAttack = 200;

        this.body.setSize(this.width * 1.5, this.height * 1.75, true);
        this.body.setOffset();

        this.play('spawn', true);

        this.attacks = ['attack1', 'attack2', 'attack3'];

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if(this.life > 0){
                if(this.anims.getName() === 'spawn'){
                    this.speed = 50;
                }
                else if (this.anims.getName() === 'attack1') {
                    this.attacking = false;
                    this.speed = 50;
                }
                else if (this.anims.getName() === 'attack2') {
                    this.attacking = false;
                    this.speed = 50;
                }
                else if (this.anims.getName() === 'attack3') {
                    this.attacking = false;
                    this.speed = 50;
                }
            }
        });

    }

    destroyEnemy(){

    }

    onTimerAttack(){
        this.attacking = true;
        let typeAttack = Math.floor(Math.random() * 3);
        this.play(this.attacks[typeAttack]);
        this.speed = 0;
    }

    doSomethingVerySpecificBecauseYoureMyBelovedChild() {
        this.setActive(false);
        this.scene.time.removeEvent(this.timerAttack);
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
        if (this.life > 0) {
            this.body.setOffset(this.width * (this.flipX ? 0.13 : 0.13), this.height * 0.14);
        }
    }

    flipEnemy(){}

    isProjectile(){
        return false;
    }
}