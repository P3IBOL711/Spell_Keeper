import Phaser from "phaser";

export default class Bullet extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */

    constructor (scene)
    {
        super(scene, 0, 0, 'bullet');

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
        this.born = 0;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(12, 12, true);
    }

    fire (shooter, target)
    {
        this.setPosition(shooter.x, shooter.y); // Initial position
        this.direction = Math.atan((target.x - this.x) / (target.y - this.y));
        //this.rotation = shooter.rotation; // angle bullet with shooters rotation
        this.rotation = Phaser.Math.Angle.Between(shooter.x, shooter.y, target.x, target.y);
        // Calculate X and y velocity of bullet to moves it from shooter to target
        // if (target.y >= this.y)
        // {
        //     // this.xSpeed = this.speed * Math.sin(this.direction);
        //     // this.ySpeed = this.speed * Math.cos(this.direction);
        //     this.body.setVelocityX(this.speed * Math.cos(this.rotation));
        //     this.body.setVelocityY(this.speed * Math.sin(this.rotation));
        // }
        // else
        // {
        //     // this.xSpeed = -this.speed * Math.sin(this.direction);
        //     // this.ySpeed = -this.speed * Math.cos(this.direction);
        //     this.body.setVelocityX(-this.speed * Math.sin(this.rotation));
        //     this.body.setVelocityY(-this.speed * Math.cos(this.rotation));
        // }

        this.body.setVelocityX(this.speed * Math.cos(this.rotation));
        this.body.setVelocityY(this.speed * Math.sin(this.rotation));
        
        this.born = 0; // Time since new bullet spawned
    }


    preUpdate(t, dt) {
        super.preUpdate(t, dt);

        this.play('normal', true);
        // this.x += this.xSpeed * dt;
        // this.y += this.ySpeed * dt;
        this.born += dt;
        // if (this.born > 1800)
        // {
        //     this.setActive(false);
        //     this.setVisible(false);
        // }
    }
}