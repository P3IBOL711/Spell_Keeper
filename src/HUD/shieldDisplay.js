import Phaser from "phaser";

export default class shieldDisplay extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'shieldDisplay');
        this.x = x;
        this.y = y;

        
    }
}