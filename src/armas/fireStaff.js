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
    constructor(scene, x, y, damage) {
        super(scene, x, y, 'fireStaff', damage)
        this.delay = 1500;

        //Intorducir logica de los sprites
    }

    isMelee() {
        return false;
    }

    attack(x, y, direction, target) {
        new Fireball(this.scene, x, y, target, true, 1);
    }
}