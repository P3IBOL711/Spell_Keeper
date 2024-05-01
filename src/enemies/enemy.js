
import Phaser from 'phaser'
import lootGenerator from '../lootGenerator';

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
    constructor(scene, x, y, target, image) {
        super(scene, x, y, image);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.enemies.add(this)
        this.scene.enviromental.add(this)
        this.scene = scene
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

        this.setDepth(7);

        this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            if (this.anims.getName() === 'die') {
                this.doSomethingVerySpecificBecauseYoureMyBelovedChild()
                this.scene.enemies.remove(this);
                this.scene.enemyHasDied();
                let loot = new lootGenerator(this.scene, this.x, this.y, this.scene.player.luck)
                let rnd = Math.random();
                if (rnd >= 0.85 - (this.scene.player.luck / 20))
                    loot.generateLoot();
                this.destroy();
            }
        });
    }

    doSomethingVerySpecificBecauseYoureMyBelovedChild() {
    }

    receiveDamageOverTime(damage, durationInSeconds) {
        const totalTicks = durationInSeconds * 60; // Assuming 60 ticks per second
    
        // Calculate the damage per tick
        const damagePerTick = damage / totalTicks;
    
        // Create a tween for the poison effect
        this.tween = this.scene.tweens.add({
            targets: this,
            repeat: totalTicks - 1, // Repeat for 'totalTicks' times
            alpha: 0.5, // Example: Lower alpha to visualize poison effect
            ease: 'Linear',
            duration: 1000, // Duration of each tick (in milliseconds)
            onUpdate: () => {
                // Apply damage to the target
                if(this.life > 0) {
                    this.receiveDamage(damagePerTick)
                    if(this.life <= 0)
                        this.tween.stop();
                }
              //  console.log("Poisoned! Damage taken: " + damagePerTick + ". Remaining health: " + this.life);
    
                // Check if target is dead
                else {
                    this.tween.stop();
                    this.enemyDied();
                }
            }
        });
    }
 
    

    receiveDamage(damage) {
        this.life -= damage;

        this.scene.tweens.add({
            targets: this,
            alpha: 0,
            ease: Phaser.Math.Easing.Elastic.InOut,
            duration: 40,
            repeat: 0,
            yoyo: true,
            onStart: () => {
                this.setTint(0xff0000);
            },
            onComplete: () => {
                this.clearTint();
                this.setAlpha(1);
            }
        })

        if (this.life <= 0) 
            this.enemyDied();
    }

    enemyDied() {
        this.body.setVelocity(0);
        this.body.enable = false;
        this.stop();
        this.play('die', true); 
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
            this.flipEnemy()
        }
    }

    flipEnemy() {
        this.setFlipX(this.body.velocity.x < 0 || this.target.x < this.x);
    }

    isProjectile() {
        return false;
    }
}