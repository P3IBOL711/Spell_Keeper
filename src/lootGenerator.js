import Phaser from "phaser";

import poisonStaff from './armas/poisonStaff'
import iceStaff from './armas/iceStaff'
import megaEspadaMortal from "./armas/megaEspadaMortal";
import hoe from "./armas/HOE";
import Shotgun from "./armas/shotgun";
import Thompson from "./armas/thompson";
import DrainSword from "./armas/drainSword";


import halfHeart from './objetos/halfHeart';
import heart from './objetos/heart';
import manaPotion from './objetos/manaPotion';
import key from "./objetos/key";

let weaponsPool = [[poisonStaff, iceStaff], [hoe, Shotgun, Thompson], [megaEspadaMortal, DrainSword]];

export default class lootGenerator {
    constructor(scene, x, y, luck) {

        this.itemsPool = [halfHeart, heart, manaPotion,key];

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.playerLuck = luck;
    }

    generateWeapon() {
        let dataGenerator = new Phaser.Math.RandomDataGenerator();
        let tier = dataGenerator.weightedPick(weaponsPool);
        let newWeapon = Phaser.Math.RND.pick(tier)

        // Remove the selected weapon class from the tier array
        tier.splice(tier.indexOf(newWeapon), 1);

        // If the tier array becomes empty, remove the entire tier from the weapons pool
        if (tier.length === 0) {
            weaponsPool.splice(weaponsPool.indexOf(tier), 1);
        }

        console.log(weaponsPool);
        return new newWeapon(this.scene, this.x, this.y);
    }

    generateLoot() {
        let randomIndex = Math.floor(Math.random() * this.itemsPool.length);
        let loot = this.itemsPool[randomIndex];
        return new loot(this.scene, this.x, this.y);
    }
}