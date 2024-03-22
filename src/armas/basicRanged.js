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
    constructor(scene, x, y, damage) {
        super(scene, x, y, 'basicRanged', damage)

        //Intorducir logica de los sprites
    }

    isMelee() {
        return false;
    }

    attack(x, y, direction, target) {
        new Bullet(this.scene, x, y, target, true, 1);
    }

    delay() {
        return 1500;
    }
}