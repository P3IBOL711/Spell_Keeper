import Phaser from "phaser";

import arma from "./arma";

const INIFINITY =  Number.MAX_SAFE_INTEGER;

export default class hoe extends arma {
    constructor(scene, x, y) {
        super(scene, x, y, 'hoe');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setOrigin(0,1);
        this.delay = 100;
        this.damage = INIFINITY;

        this.id = 'hoe';
        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
    }

    haveSlash() {
        return true;
    }

    isUltimateWeapon() {
        return true;
    }

    forwardSlash() {
        return false;
    }

    attack(target) {
        super.attack(target);
    }

    manaRegen() {
        return ;
    }
}