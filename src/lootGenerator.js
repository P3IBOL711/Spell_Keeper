import Phaser from "phaser";

import fireStaff from './armas/fireStaff'
import iceStaff from './armas/iceStaff'
import megaEspadaMortal from "./armas/megaEspadaMortal";

import halfHeart from './objetos/halfHeart';
import heart from './objetos/heart';
import manaPotion from './objetos/manaPotion';
import hoe from "./armas/HOE";

export default class lootGenerator {
    constructor(scene, x, y, luck) {
        this.weaponsPool = [fireStaff, iceStaff, megaEspadaMortal, hoe];
        this.itemsPool = [halfHeart, heart, manaPotion];

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.playerLuck = luck;
    }

    generateWeapon() {
        let dataGenerator = new Phaser.Math.RandomDataGenerator();
        let newWeapon = dataGenerator.weightedPick(this.weaponsPool);
        return new newWeapon(this.scene, this.x, this.y);
    }

    generateLoot() {
        let randomIndex = Math.floor(Math.random() * this.itemsPool.length);
        let loot = this.itemsPool[randomIndex];
        return new loot(this.scene, this.x, this.y);
    }
}