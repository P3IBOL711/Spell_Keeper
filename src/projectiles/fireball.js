import Phaser from "phaser";
import Projectile from "./projectile";

export default class Bullet extends Projectile {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */

    constructor (scene, x, y, target, targetEnemy, damage)
    {
        super(scene, x, y, 'bullet', targetEnemy, damage);

        this.anims.create({
            key: 'normal',
            frames: this.anims.generateFrameNumbers('fireball_spritesheet', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'impact',
            frames: this.anims.generateFrameNumbers('fireball_spritesheet', { start: 2, end: 4 }),
            frameRate: 10,
            repeat: -1
        });

        this.speed = 100;
        this.rotation = Phaser.Math.Angle.Between(x, y, target.x, target.y);
        if (this.angle >= 45 && this.angle <= 135 || this.angle >= -135 && this.angle <= -45) {
            this.body.setSize(this.width * 0.1, this.height * 0.6, true);
        }
        else {
            this.body.setSize(this.width * 0.6, this.height * 0.1, true);
        }

        this.body.setVelocityX(this.speed * Math.cos(this.rotation));
        this.body.setVelocityY(this.speed * Math.sin(this.rotation));
    }

    impact() {
        super.impact();
        this.play('impact', true);
        this.destroy();
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (!this.impacted)
            this.play('normal', true);
    }
}