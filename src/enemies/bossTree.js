
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
        super(scene, x, y, target, 'bossTree', 3000);
        
        this.anims.create({
            key: 'spawn',
            frames: this.anims.generateFrameNumbers('bossTreeSpritesheet', { start: 0, end: 30 }),
            frameRate: 6,
            repeat: 0
        }); 

        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('bossTreeMovementsSpritesheet', { start: 0 , end: 7 }),
            frameRate: 5,
            repeat: 0
        });

        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('bossTreeMovementsSpritesheet', { start: 8 , end: 11 }),
            frameRate: 5,
            repeat: 10
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('bossTreeMovementsSpritesheet', { start: 12 , end: 25 }),
            frameRate: 5,
            repeat: 0
        });

        this.setScale(2);
        this.disableInteractive();

        this.speed = 0;

        this.distanceAttack = 500;

        this.spawning = true;
        this.body.enable = false;

        this.play('spawn', true);

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if(this.life > 0){
                if(this.anims.getName() === 'spawn'){
                    this.spawning = false;
                    this.body.setSize(this.width * 0.35, this.height * 0.85, true);
                    this.body.setOffset(this.width * 0.07, this.height * 0.14);
                    this.body.enable = true;
                    this.play('walking', true);
                }
                else if (this.anims.getName() === 'attack') {
                    //this.play("redAttack", true);
                    this.attacking = false;
                    this.rootTimer.paused = true;
                }
            }
        });

        this.rootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.onRootAttack, 
            callbackScope: this,
            loop: true
        });

        this.rootTimer.paused = true;
    }

    onRootAttack(){
        new SurpriseRoot(this.scene, this.target.x, this.target.y, false, 1);
    }

    onTimerAttack(){
        this.attacking = true;
        let typeAttack = Math.floor(Math.random() * 2);
        if (typeAttack === 7){
            new MovingRoot(this.scene, this.x, this.y + 10, false, 1);
        }
        else{
            new SurpriseRoot(this.scene, this.target.x, this.target.y, false, 1);
            this.rootTimer.paused = false;
        }
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