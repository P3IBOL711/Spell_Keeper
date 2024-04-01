import Phaser from "phaser";

import arma from "./arma";
import PlayerHitBox from "../playerHitbox";


export default class basicMelee extends arma {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, damage) {
        super(scene, x, y, 'dagger', damage);
        this.setOrigin(0, 0.5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 1100;

        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
    }

    isMelee() {
        return true;
    }


    attack(x, y, direction, target) {
        let attackHitbox;
        if(direction === 'left') {
            attackHitbox = new PlayerHitBox(this.scene, x - 30, y, 64, 64, 1);
        }
        else if(direction === 'right') {
            attackHitbox = new PlayerHitBox(this.scene, x + 30, y, 64, 64, 1);
        }
        else if(direction === 'up') {
            attackHitbox = new PlayerHitBox(this.scene, x, y - 30, 64, 64, 1);
        }
        else if(direction === 'down') {
            attackHitbox = new PlayerHitBox(this.scene, x, y + 30, 64, 64, 1);
        }

        //attackHitbox.destroy();
    }

    manaRegen() {
        return 20;
    }
}