import Phaser from "phaser";

import item from "./item";

export default class heart extends item {

    constructor(scene, x, y) {
        super(scene, x, y, 'healingHeart');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.healEffective = 2;
        this.x = x;
        this.y = y;

        this.scene.physics.add.overlap(this, this.scene.player, () => {
            this.scene.player.heal(this.healEffective);
            this.destroy();
        });
    }
}