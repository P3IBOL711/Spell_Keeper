import Phaser from "phaser";

import arma from "./arma";
import IceBall from "../projectiles/iceball";

const DAMAGE = 10;

export default class IceStaff extends arma {
 /**
     * Constructor del baston de fuego
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'iceStaff')
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 5;
        this.id = 'iceStaff'
        this.delay = 250;
        this.x = x;
        this.y = y;
       
        this.setActive(true);
        this.setVisible(true);

        this.damage = DAMAGE;
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

    attack(target) {
        super.attackAction();
        if(this.x != 0 && this.y != 0)
            new IceBall(this.scene, this.x, this.y, target, true, this.damage);
    }

    manaCost() {
        return 50;
    }
}