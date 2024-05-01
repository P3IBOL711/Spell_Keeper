
import Phaser from 'phaser'
import Enemy from '../enemy'
import MovingRoot from './movingRoot'
import SurpriseRoot from './surpriseRoot';
import Acorn from './acorn';
import AcornShadow from './acornShadow';
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

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('bossTreeMovementsSpritesheet', { start: 23 , end: 23 }),
            frameRate: 1,
            repeat: -1
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
                    this.attacking = false;
                    this.surpriseRootTimer.paused = true;
                    this.followingRootTimer.paused = true;
                    this.acornTimer.paused = true;
                }
            }
        });

        this.surpriseRootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.onSurpriseRootAttack, 
            callbackScope: this,
            loop: true
        });

        this.followingRootTimer = this.scene.time.addEvent({
            delay: 2000,
            callback: this.onFollowingRootAttack, 
            callbackScope: this,
            loop: true
        });

        this.acornTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.onAcornAttack, 
            callbackScope: this,
            loop: true
        });


        this.surpriseRootTimer.paused = true;
        this.followingRootTimer.paused = true;
        this.acornTimer.paused = true;
    }

    onAcornAttack(){
        let acornShadow = new AcornShadow(this.scene, this.target.x, this.target.y + 20);
        new Acorn(this.scene, this.target.x, 0, false, 1, acornShadow);
    }

    onSurpriseRootAttack(){
        new SurpriseRoot(this.scene, this.target.x, this.target.y, false, 1);
    }

    onFollowingRootAttack(){
        let angleRadians = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y)
        let angle =  (angleRadians * 180) / Math.PI;
        
        if((angle >= 45 && angle <= 135) || (angle >= -135 && angle <= -45)) {
            new MovingRoot(this.scene, this.x + 40, this.y, false, 1, this.target, angleRadians);
            new MovingRoot(this.scene, this.x, this.y, false, 1, this.target, angleRadians);
            new MovingRoot(this.scene, this.x - 40, this.y, false, 1, this.target, angleRadians);
        }
        else{
            new MovingRoot(this.scene, this.x, this.y - 40, false, 1, this.target, angleRadians);
            new MovingRoot(this.scene, this.x, this.y, false, 1, this.target, angleRadians);
            new MovingRoot(this.scene, this.x, this.y + 40, false, 1, this.target, angleRadians);
        }
    }



    onTimerAttack(){
        this.attacking = true;
        let typeAttack = Math.floor(Math.random() * 3);
        if (typeAttack === 0){
            this.followingRootTimer.paused = false;
        }
        else if(typeAttack === 1){
            this.surpriseRootTimer.paused = false;
        }
        else if(typeAttack === 2){
            this.acornTimer.paused = false;
        }
        this.play("attack", true);
    }

    destroyEnemy(){
        this.stop();
        this.play('idle', true);
    }

    

    receiveDamage(damage){
        this.scene.time.removeAllEvents();
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