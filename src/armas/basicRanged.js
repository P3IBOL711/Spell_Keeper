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
    constructor(scene, x, y, damage,equiped) {
        super(scene, x, y, 'poisonStaff', damage,equiped)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 500;
        this.setOrigin(0, 0.5);

        this.setActive(true);
        this.setVisible(true);

        this.damage = damage;

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