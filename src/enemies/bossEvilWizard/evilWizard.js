
import Phaser from 'phaser'
import Enemy from '../enemy'
import HitBox from '../../hitbox';
import Attack1Effect from './attack1_effect';
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
        

        // FILA MAS LARGA DE 47 FRAMES
        this.anims.create({
            key: 'spawn',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 0, end: 19 }),
            frameRate: 6,
            repeat: 0
        });

        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 47, end: 52 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'attack1',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 95, end: 107 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'attack2',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 142, end: 161 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'attack3',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 189, end: 235 }),
            frameRate: 7,
            repeat: 0
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('evilWizardSpritesheet', { start: 236, end: 246 }),
            frameRate: 8,
            repeat: 0
        });

        this.setScale(1.25);

        this.speed = 0;

        this.distanceAttack = 200;

        this.body.setSize(this.width * 1.5, this.height * 1.75, true);
        this.body.setOffset(this.width * 0.13, this.height * 0.14);

        this.play('spawn', true);

        this.attacks = ['attack1', 'attack2', 'attack3'];

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if(this.life > 0){
                if(this.anims.getName() === 'spawn'){
                    this.speed = 50;
                }
                else if (this.anims.getName() === 'attack1') {
                    this.attackZone.destroy(true);
                    this.attack1effect.destroy(true);
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

        this.on(Phaser.Animations.Events.ANIMATION_START, () => {
            if(this.life > 0){
                if (this.anims.getName() === 'attack2') {
                    // Invulnerable a los ataques a distancia, crea charcos de lava en el suelo que hacen daño al jugador si pasa por encima
                    this.vulnerable = false;
                }
                else if (this.anims.getName() === 'attack3') {
                    // Crea un ciruclo de fuego alrededor suya que se mueve hacia 
                }
            }
        });

        this.on(Phaser.Animations.Events.ANIMATION_UPDATE, () => {
            if(this.life > 0){
                if (this.anims.getName() === 'attack1' && this.anims.currentFrame.index === 7) {
                    // Carga un puñetazo hacia el jugador
                    this.attackZone = new HitBox(this.scene, this.x + 20, this.y - 10, 100, 100, this.target, this.damage);
                    this.attack1effect = new Attack1Effect(this.scene, this.x + 30, this.y + 5);
                }
            }
        });

    }

    destroyEnemy(){

    }

    onTimerAttack(){
        this.attacking = true;
        let typeAttack = Math.floor(Math.random() * 3);
        //this.play(this.attacks[typeAttack]);
        this.play('attack1');
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
    }

    flipEnemy(){}

    isProjectile(){
        return false;
    }
}