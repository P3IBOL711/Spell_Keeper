import Phaser from "phaser";

import meleeWeapon from "./meleeWeapon";

export default class ChofSword extends meleeWeapon {

    constructor(scene, x, y) {
        super(scene, x, y, 'espadaNormalucha');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 300;
        this.damage = 1;

        this.id = 'espadaNormalucha';
        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    haveSlash() {
        return true;
    }

    attack(target) {
        super.attack(target);
    }

    manaRegen() {
        return 40;
    }
}