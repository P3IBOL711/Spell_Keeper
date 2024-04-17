import Phaser from "phaser";

import arma from "./arma";

export default class hoe extends arma {
    constructor(scene, x, y) {
        super(scene, x, y, 'hoe');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 100;
        this.hasAttacked = false;
        this.damage = Number.MAX_SAFE_INTEGER;
        this.timeOnField = 0;
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
        super.attackAction();
        this.hasAttacked = true;

        // Obtener la rotación actual del arma
        let angle = Phaser.Math.DegToRad(this.angle);

        // Calcular las dimensiones de la hitbox en función del tamaño del arma
        let hitboxWidth = this.width * 4; // Ajusta el factor según lo deseado
        let hitboxHeight = this.height * 4; // Ajusta el factor según lo deseado


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