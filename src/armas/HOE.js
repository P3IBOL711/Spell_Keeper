import Phaser from "phaser";

import arma from "./arma";
import PlayerHitBox from "../playerHitbox";

const DAMAGE =  Number.MAX_SAFE_INTEGER;

export default class hoe extends arma {
    constructor(scene, x, y) {
        super(scene, x, y, 'hoe');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 100;
        this.hasAttacked = false;
        this.damage = DAMAGE;
        this.timeOnField = 0;
        this.setOrigin(0,1);
        this.x = x;
        this.y = y;
        this.id = 'hoe'
        this.setActive(true);
        this.setVisible(true);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt)
        if(this.hasAttacked) {
            this.timeOnField += dt;
            if(this.timeOnField >= 100) {
                this.hasAttacked = false;
                this.timeOnField = 0;
                this.attackFinished();
            }
        }
    }

    isMelee() {
        return true;
    }

    haveSlash() {
        return true;
    }

    havePuncture() {
        return false;
    }

    isUltimateWeapon() {
        return true;
    }

    attack(target) {
        super.attackAction(false);
        this.hasAttacked = true;

        // Obtener la rotación actual del arma
        let angle = Phaser.Math.DegToRad(this.angle);

        // Calcular las dimensiones de la hitbox en función del tamaño del arma
        let hitboxWidth
        let hitboxHeight
        if (Math.abs(Math.cos(angle)) > 0.6) {
            // El arma mira hacia la derecha o hacia la izquierda
            hitboxWidth = this.width * 1.5;
            hitboxHeight = this.height * 1.5;
        } else {
            // El arma mira hacia arriba o hacia abajo
            hitboxWidth = this.height * 1.5;
            hitboxHeight = this.width * 1.5;
        }


        // Calcular las coordenadas de la hitbox relativas al arma
        let hitboxOffsetX = this.width * 0.4 * Math.cos(angle); // Ajusta el factor según lo deseado
        let hitboxOffsetY = this.height * 0.4 * Math.sin(angle); // Ajusta el factor según lo deseado

        // Calcular las coordenadas absolutas de la hitbox en el mundo
        let hitboxX = this.x + hitboxOffsetX;
        let hitboxY = this.y + hitboxOffsetY;

        this.attackHitbox = new PlayerHitBox(this.scene, hitboxX, hitboxY, hitboxWidth, hitboxHeight, this.damage, this.angle,this.id);
    }

    attackFinished() {
        if(this.attackHitbox)
            this.attackHitbox.destroy();
    }

    manaRegen() {
        return this.scene.player.maxMana;
    }
}