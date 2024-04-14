
import Phaser, { Game } from 'phaser'

/**
 * Clase que representa un enemigo del juego.
 */
export default class Enemy extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, target, image, attackDelay) {
        super(scene, x, y, image);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.enemies.add(this)
        this.scene.enviromental.add(this)
        // Queremos que el enemigo no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        // Velocidad 0 por defecto
        this.speed = 0;
        // Daño
        this.damage = 1;
        // Vida
        this.life = 1;
        
        this.target = target;

        // is enemy attacking?
        this.attacking = false;

        // distance from player to start attacking
        this.distanceAttack = 150;

        this.timerAttack = this.scene.time.addEvent({
            delay: attackDelay,
            callback: this.onTimerAttack,
            callbackScope: this,
            loop: true
        });

        this.timerAttack.paused = true;

        this.setDepth(7);

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if (this.anims.getName() === 'die'){
                this.doSomethingVerySpecificBecauseYoureMyBelovedChild()
                this.scene.enemies.remove(this);
                this.destroy();
            }
        });

        this.pathFinding = this.scene.time.addEvent({
            delay: 1000,
            callback: this.onPathFinding,
            callbackScope: this,
            loop: true
        });

        this.moveEnemy = (path) => {
            let tweens = [];
            for(let i = 0; i < path.length-1; i++){
                let ex = path[i+1].x;
                let ey = path[i+1].y;
                tweens.push({
                    targets: this,
                    x: {value: ex*this.scene.map.tileWidth, duration: 200},
                    y: {value: ey*this.scene.map.tileHeight, duration: 200}
                });
            }
            this.scene.tweens.timeline({
                tweens: tweens })
        };
    }

    doSomethingVerySpecificBecauseYoureMyBelovedChild() {
    }


    receiveDamage(damage){
        this.life -= damage;

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: Phaser.Math.Easing.Elastic.InOut,
            duration: 40, 
            repeat: 1,
            yoyo: true,
            onStart: () => {
                this.setTint(0xff0000);
            },
            onComplete: () => {
                this.clearTint();
                this.setAlpha(1);
            }
        })

        if (this.life <= 0){
            this.body.setVelocity(0);
            this.body.enable = false;
            this.scene.enemyHasDied();
            this.stop();
            this.play('die', true);
        }
    }

    onPathFinding(){
        let toX = Math.floor(this.target.x/this.scene.map.tileWidth);
        let toY = Math.floor(this.target.y/this.scene.map.tileHeight);
        let fromX = Math.floor(this.x/this.scene.map.tileWidth);
        let fromY = Math.floor(this.y/this.scene.map.tileHeight);
        this.scene.finder.findPath(fromX, fromY, toX, toY, function( path ) {
            if (path === null) {
                console.warn("Path was not found.");
            } else {
                console.log(path);
                this.moveEnemy(path);
            }
        });
        this.scene.finder.calculate();
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
        if (this.life > 0){
            this.flipEnemy()
            this.playAfterRepeat('walking');
            if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) > this.distanceAttack){
                this.timerAttack.paused = true;
            }
            else {
                this.timerAttack.paused = false;
            } 
        }
    }

    flipEnemy(){
        this.setFlipX(this.body.velocity.x < 0 || this.target.x < this.x);
    }

    isProjectile(){
        return false;
    }
}