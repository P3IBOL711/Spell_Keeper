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
        this.hasAttacked = false;
        this.timeOnField = 0;

        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
        if(this.hasAttacked) {
            this.timeOnField += dt;
            if(this.timeOnField >= 250) {
                this.hasAttacked = false;
                this.timeOnField = 0;
                this.attackFinished();
            }
        }
    }

    isMelee() {
        return true;
    }


    attack(x, y, direction, target) {
        this.hasAttacked = true;
        if(direction === 'left') {
            this.attackHitbox = new PlayerHitBox(this.scene, x - 30, y, 64, 64, 1);
        }
        else if(direction === 'right') {
            this.attackHitbox = new PlayerHitBox(this.scene, x + 30, y, 64, 64, 1);
        }
        else if(direction === 'up') {
            this.attackHitbox = new PlayerHitBox(this.scene, x, y - 30, 64, 64, 1);
        }
        else if(direction === 'down') {
            this.attackHitbox = new PlayerHitBox(this.scene, x, y + 30, 64, 64, 1);
        }
    }

    attackFinished() {
        if(this.attackHitbox)
            this.attackHitbox.destroy();
    }

    manaRegen() {
        return 20;
    }
}