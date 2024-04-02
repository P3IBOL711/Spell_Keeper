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
        super(scene, x, y, 'basicRanged')
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 3000;
        this.damage = 2;
        //Intorducir logica de los sprites
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
    }

    isMelee() {
        return false;
    }

    attack(x, y, direction, target) {
        new Bullet(this.scene, x, y, target, true, this.damage);
    }

    manaCost() {
        return 10;
    }
}