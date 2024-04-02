import Phaser from "phaser";

import Fireball from "../projectiles/fireball";
import arma from "./arma";

export default class FireStaff extends arma {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, damage,equiped) {
        super(scene, x, y, 'fireStaff', damage,equiped)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 5;
        this.id = 'FireStaff'
       
        this.setActive(true);
        this.setVisible(true);
        //Intorducir logica de los sprites
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
    }

    isMelee() {
        return false;
    }

    attack(x, y, direction, target) {
        new Fireball(this.scene, x, y, target, true, 1);
    }

    manaCost() {
        return 5;
    }
}