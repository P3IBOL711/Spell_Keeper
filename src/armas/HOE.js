import Phaser from "phaser";

import arma from "./arma";

export default class hoe extends arma {
    constructor(scene, x, y) {
        super(scene, x, y, 'hoe');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 250;
        this.hasAttacked = false;
        this.damage = Number.MAX_SAFE_INTEGER;
        this.timeOnField = 0;
        this.x = x;
        this.y = y;

        this.setActive(true);
        this.setVisible(true);
    }


    isMelee() {
        return true;
    }

    haveSlash() {
        return true;
    }

    havePuncture() {
        return false;
    }
}