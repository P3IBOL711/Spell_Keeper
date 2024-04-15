import Phaser from "phaser";

import Bullet from "../projectiles/bullet";
import arma from "./arma";

export default class basicRanged extends arma {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'poisonStaff')
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 300;
        this.setOrigin(0, 0.5);
        this.x = x;
        this.y = y;

        this.setActive(true);
        this.setVisible(true);

        this.damage = 1;
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
        if(this.x != 0 && this.y != 0)
            new Bullet(this.scene, this.x, this.y, target, true, this.damage);
    }

    manaCost() {
        return 10;
    }
}