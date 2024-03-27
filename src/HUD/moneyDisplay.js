import Phaser from "phaser";

export default class MoneyDisplay extends Phaser.GameObjects.Text {

    constructor(scene, x, y, font, initialMoney) {
        super(scene, x, y, '', font)

        this.actualMoney = initialMoney;

        this.setStyle(font);

        this.updateText();

        this.scene.add.existing(this);
    }

    updateText() {
        this.setText('Money: ' + this.actualMoney);
    }

    setMoney(amount) {
        this.actualMoney = amount;
        this.updateText();
    }
}