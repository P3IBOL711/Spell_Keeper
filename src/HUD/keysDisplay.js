import Phaser from "phaser";

export default class MoneyDisplay extends Phaser.GameObjects.Text {

    constructor(scene, x, y, font) {
        super(scene, x, y, '', font)

        this.actualKeys = 0;

        this.setStyle(font);

        this.updateText();

        this.scene.add.existing(this);
    }

    updateText() {
        this.setText('Money: ' + this.actuaKeys);
    }

    setKeys(amount) {
        this.actualkeys = amount;
        this.updateText();
    }
}