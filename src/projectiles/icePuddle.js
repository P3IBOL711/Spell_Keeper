import Phaser from "phaser";

export default class icePuddle extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de un charco de hielo
     * @param {Phaser.Scene} scene Escena 
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */

    constructor (scene, x, y, targetEnemy, damage)
    {
        super(scene, x, y, 'icePuddle');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(0.5);

        this.x = x;
        this.y = y;
        this.damageOverTime = damage;
        this.targets = targetEnemy;
        this.creating = false;

        this.anims.create({
            key: 'create',
            frames: this.anims.generateFrameNumbers('puddle_spritesheet', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('puddle_spritesheet', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.physics.add.overlap(this.scene.enemies, this, () => {
            if (this.targets) {
                enemy.receiveDamageOverTime(damage);
            }
        });

        this.scene.time.addEvent({
            delay: 5000,
            callback: this.destroy(),
            callbackScope: this
        });
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if(!this.creating) {
            this.creating = true;
            this.play('create', true);
        }
        else {
            this.play('idle', true);
        }
    }
}