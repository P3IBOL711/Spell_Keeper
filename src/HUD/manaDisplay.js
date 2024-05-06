import Phaser from "phaser";

export default class ManaDisplay extends Phaser.GameObjects.Graphics {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, width, height, initialMana, maxMana) {
        super(scene);

        this.maxMana = maxMana;

        this.y = y;
        this.x = x;

        this.background = this.scene.add.image(this.x - 32, this.y - 20, 'manaBar').setOrigin(0); //Aqui iria height y width

        this.mainMana = this.scene.add.image((this.x + 18) - 32, this.y - 20, 'mainMana').setOrigin(0);

	    this.mainMana.displayWidth = this.maxMana;
    }

    setMeterPercentageAnimated(percent = 1, duration = 1000) {
        let width = this.maxMana * percent;

        this.scene.tweens.add({
            targets: this.mainMana,
            displayWidth: width,
            duration: duration,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: () => {
                this.mainMana.visible = this.mainMana.displayWidth > 0
            }
        });
    }
}