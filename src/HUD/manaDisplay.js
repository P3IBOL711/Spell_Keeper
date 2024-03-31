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

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.currentMana = initialMana;
        this.maxMana = maxMana;

        this.draw();
    }

    draw() {
        this.clear();

        // Dibuja el fondo de la barra de maná
        this.fillStyle(0x4169E1); //Azul más oscuro
        this.fillRect(0, 0, this.width, this.height);

        // Añadimos un borde a la barra de vida
        this.lineStyle(2, 0x000000); // Borde negro
        this.strokeRect(this.x, this.y, this.width, this.height);

        // Calcula el ancho de la barra de maná según el maná actual
        const manaWidth = (this.currentMana / this.maxMana) * this.width;

        // Dibuja la barra de maná
        this.fillStyle(0x6495ED); //Azul
        this.fillRect(0, 0, manaWidth, this.height);
    }


    setMana(mana, manaMax) {
        this.currentMana = mana;
        if(this.maxMana < 1000 || this.maxMana > 10) {
            if(this.currentMana > manaMax) {
                this.maxMana = this.currentMana;
            }
        }

        // Vuelve a dibujar la barra de maná con el nuevo valor de maná
        this.draw();
    }
}