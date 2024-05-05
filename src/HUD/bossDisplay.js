import Phaser from "phaser";

export default class BossDisplay extends Phaser.GameObjects.Graphics {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, width, height, initialLife, maxLife) {
        super(scene);

        this.maxLife = maxLife;
        this.setDepth(1000)
      
        this.y = y;
        this.x = x;
        
        
        this.background = this.scene.add.image(this.x - 32, this.y - 20, 'manaBar').setOrigin(0, 0.5).setDisplaySize(300, 80).setDepth(1000).setTint(0xff0000).setVisible(false); //Aqui iria height y width

        this.mainMana = this.scene.add.image((this.x + 18) - 32, this.y - 20, 'mainMana').setOrigin(0, 0.5).setScale(5).setDepth(999).setTint(0xff0000).setVisible(false);

	    this.finalMana = this.scene.add.image((this.mainMana.x + this.mainMana.displayWidth) - 32, this.y - 20, 'finalMana').setOrigin(0, 0.5).setScale(5).setDepth(999).setTint(0xff0000).setVisible(false);

	    this.setMeterPercentage(initialLife / maxLife);
    }

    setMeterPercentage(percent = 0.5) {
        let width = this.maxLife * percent;

        this.mainMana.displayWidth = width;
        this.finalMana.x = this.mainMana.x + this.mainMana.displayWidth;
    }
    
    visible(){
        this.background.setVisible(true)
        this.mainMana.setVisible(true)
        this.finalMana.setVisible(true)
    }

    setMeterPercentageAnimated(percent = 1, duration = 1000) {
        let width = this.maxLife * percent;

        this.scene.tweens.add({
            targets: this.mainMana,
            displayWidth: width,
            duration: duration,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: () => {
                this.finalMana.x = this.mainMana.x + this.mainMana.displayWidth;

                this.mainMana.visible = this.mainMana.displayWidth > 0
                this.finalMana.visible = this.mainMana.displayWidth > 0
            }
        });
    }
}