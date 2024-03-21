import Phaser from "phaser";
import Arma from "./weapons/arma";
import Bullet from "./weapons/bullet";

export default class basicRanged extends Arma {
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
}