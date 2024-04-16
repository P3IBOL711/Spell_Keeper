import Phaser from "phaser";

import arma from "./arma";
import PlayerHitBox from "../playerHitbox";


export default class megaEspadaMortal extends arma {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'espadaCheta');
        this.setOrigin(0, 0.5);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 500;
        this.hasAttacked = false;
        this.damage = 1000;
        this.timeOnField = 0;
        this.x = x;
        this.y = y;

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

    havePuncture() {
        return false;
    }

    haveSlash() {
        return true;
    }


    attack(target) {
        super.attackAction();
        this.hasAttacked = true;

        let angle = Phaser.Math.DegToRad(this.angle);

        let hitboxWidth = this.width * 2;
        let hitboxHeight = this.width * 2; 

        let hitboxOffsetX = this.width * 0.4 * Math.cos(angle);
        let hitboxOffsetY = this.height * 0.4 * Math.sin(angle);

        let hitboxX = this.x + hitboxOffsetX;
        let hitboxY = this.y + hitboxOffsetY;

        this.attackHitbox = new PlayerHitBox(this.scene, hitboxX, hitboxY, hitboxWidth, hitboxHeight, this.damage, this.angle);
    }

    attackFinished() {
        if(this.attackHitbox)
            this.attackHitbox.destroy();
    }

    manaRegen() {
        return 20;
    }
}