import Phaser from "phaser";

export default class shieldDisplay extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'shieldDisplay');
        this.x = x;
        this.y = y;

        this.anims.create({
            key: 'ready',
            frames: this.anims.generateFrameNumbers('shield_spritesheet', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'shieldUsed',
            frames: this.anims.generateFrameNumbers('shield_spritesheet', [start: 1, end: 1]),
            frameRate: 10,
            duration: 3000,
            repeat: 0
        })

        this.anims.create({
            key: 'onCooldown',
            frames: this.anims.generateFrameNumbers('shield_spritesheet', {start: 0, end: 4}),
            frameRate: 10,
            duration: 10000, //13 segundos de cooldown en total, 3 de la duraicon y 10 de cd 
            repeat: 0
        });

        this.play('ready');
    }


}