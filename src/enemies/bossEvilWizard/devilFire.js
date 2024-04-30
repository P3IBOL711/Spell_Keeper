import Phaser from 'phaser'
import Projectile from '../../projectiles/projectile'

export default class DevilFire extends Projectile {
    /**
        * Constructor
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */
    constructor(scene, x, y, target, targetEnemy, damage) {
        super(scene, x, y, 'devilFire', targetEnemy, damage);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.anims.create({
            key: 'normal',
            frames: this.anims.generateFrameNumbers('devilFire', { start: 0, end: 0 }),
            frameRate: 7,
            repeat: 0
        });

        this.setDepth(5);
        this.setScale(0.75);

        this.damage = 1;

        this.speed = 10;

        this.rotation = Phaser.Math.Angle.Between(x, y, target.x, target.y);

        if (this.angle >= 45 && this.angle <= 135 || this.angle >= -135 && this.angle <= -45) {
            this.body.setSize(this.width * 0.1, this.height * 0.6, true);
        }
        else {
            this.body.setSize(this.width * 0.6, this.height * 0.1, true);
        }

        this.body.setVelocityX(this.speed * Math.sin(this.rotation));
        this.body.setVelocityY(this.speed * Math.cos(this.rotation));

        this.scene.physics.add.overlap(this, this.scene.player, () => {
            this.scene.player.receiveDamage(this.damage);
        });
    }
}