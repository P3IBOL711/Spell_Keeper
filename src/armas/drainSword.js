import Phaser from "phaser";

import arma from "./arma";
import PlayerHitBox from "../playerHitbox";
import meleeWeapon from "./meleeWeapon";


export default class DrainSword extends meleeWeapon {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, damage) {
        super(scene, x, y, 'drainsword');
        this.setOrigin(0, 0.5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 500;
        this.damage = 1;

        this.id = 'drainsword';
        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
    }

    haveSlash() {
        return true;
    }

    attack(target) {
        super.attack(target);
    }

    manaRegen() {
        return 2;
    }
}