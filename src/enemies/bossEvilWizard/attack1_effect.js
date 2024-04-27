import Phaser from 'phaser'

export default class Attack1Effect extends Phaser.GameObjects.Sprite {
    /**
        * Constructor
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */
    constructor(scene, x, y) {
        super(scene, x, y, 'attack1eff');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.anims.create({
            key: 'spawn',
            frames: this.anims.generateFrameNumbers('attack1effect', { start: 0, end: 4 }),
            frameRate: 7,
            repeat: 0
        });

        this.setScale(2);
        this.setDepth(10);
        this.play('spawn');
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}