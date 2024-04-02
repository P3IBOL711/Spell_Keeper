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

        this.fullWidth = 300;

        this.y = 100;
        this.x = 20;

        this.background = this.scene.add.image(this.x, this.y, 'manaBar').setOrigin(0, 0.5);

        this.leftMana = this.scene.add.image(this.x, this.y, 'manaLeft')
		.setOrigin(0, 0.5)

	    this.middleMana = this.scene.add.image(this.leftMana.x + this.leftMana.width, this.y, 'manaMid')
		.setOrigin(0, 0.5)

	    this.rightMana = this.scene.add.image(this.middleMana.x + this.middleMana.displayWidth, this.y, 'manaRight')
		.setOrigin(0, 0.5)

	    this.setMeterPercentage(1)

        // this.scene.add.existing(this);
        // this.scene.physics.add.existing(this);

        // this.x = x;
        // this.y = y;
        // this.width = width;
        // this.height = height;

        // this.currentMana = initialMana;
        // this.maxMana = maxMana;

        // this.draw();

    }

    setMeterPercentage(percent = 1) {
        let width = this.fullWidth * percent;

        this.middleMana.displayWidth = width;
        this.rightMana.x = this.middleMana.x + this.middleMana.displayWidth;
    }

    setMeterPercentageAnimated(percent = 1, duration = 1000) {
        let width = this.fullWidth * percent;

        this.scene.tweens.add({
            targets: this.middleMana,
            displayWidth: width,
            duration: duration,
            ease: Phaser.Math.Easing.Sine.Out,
            onUpdate: () => {
                this.rightMana.x = this.middleMana.x + this.middleMana.displayWidth
    
                this.leftMana.visible = this.middleMana.displayWidth > 0
                this.middleMana.visible = this.middleMana.displayWidth > 0
                this.rightMana.visible = this.middleMana.displayWidth > 0
            }
        })
    }

//     draw() {
//         this.clear();

//         // Dibuja el fondo de la barra de maná
//         this.fillStyle(0x4169E1); //Azul más oscuro
//         this.fillRect(0, 0, this.width, this.height);

//         // Añadimos un borde a la barra de vida
//         this.lineStyle(2, 0x000000); // Borde negro
//         this.strokeRect(0, 0, this.width, this.height);

//         // Calcula el ancho de la barra de maná según el maná actual
//         let manaWidth = (this.currentMana === this.maxMana) ? this.width : (this.currentMana / this.maxMana) * this.width;

//         // Dibuja la barra de maná
//         this.fillStyle(0x6495ED); //Azul
//         this.fillRect(0, 0, manaWidth, this.height);
//     }


//     setMana(mana, manaMax) {
//         this.currentMana = mana;
//         if(this.maxMana < 1000 || this.maxMana > 10) {
//             if(this.currentMana >= manaMax) {
//                 this.maxMana = this.currentMana;
//             }
//         }

//         // Vuelve a dibujar la barra de maná con el nuevo valor de maná
//         this.draw();
//     }
}