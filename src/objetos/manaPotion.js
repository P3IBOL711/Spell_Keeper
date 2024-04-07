import Phaser from "phaser";

import item from "./item";

export default class manaPotion extends item {

    constructor(scene, x, y) {
        super(scene, x, y, 'potionOfMana');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.manaRegeration = 50;
        this.x = x;
        this.y = y;

        this.scene.physics.add.overlap(this, this.scene.player, () => {
            this.scene.player.recoverMana(this.manaRegeration);
            this.destroy();
        });
    }

    isActive() {
        return true;
    }
}