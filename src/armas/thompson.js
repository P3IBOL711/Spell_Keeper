import Phaser from "phaser";


import arma from "./arma";
import IronBullet from '../projectiles/ironBullet.js';

export default class Thompson extends arma {
    /**
        * Constructor del jugador
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */
    constructor(scene, x, y, damage) {
        super(scene, x, y, 'thompson')
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.id = 'Thompson'
        this.delay = 50;
        this.x = x;
        this.y = y;

        this.anims.create({
            key: 'normal',
            frames: this.anims.generateFrameNumbers('thompson', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'shooting',
            frames: this.anims.generateFrameNumbers('thompson', { start: 1, end: 2 }),
            frameRate: 10,
            repeat: 0
        });

        this.setActive(true);
        this.setVisible(true);

        this.damage = damage;
        this.anims.play('normal')
        //Intorducir logica de los sprites
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
    }

    isMelee() {
        return false;
    }

    havePuncture() {
        return false;
    }

    haveSlash() {
        return false;
    }

    attack(direction, target) {
        super.attackAction();
        if (this.x != 0 && this.y != 0) {
            this.anims.play('shooting')

            new IronBullet(this.scene, this.x , this.y , target, true, this.damage);
            this.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.anims.play('normal')
            });
        }
    }

    manaCost() {
        return 5;
    }
}