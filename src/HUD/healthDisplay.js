import Phaser from 'phaser';

export default class HealthDisplay extends Phaser.GameObjects.Graphics {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, width, height, maxHealth) {
        super(scene);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.maxHealth = maxHealth;
        this.actualWidth = this.width/this.maxHealth;

        this.draw();
    }

    draw() {
        this.clear();

        // Configuramos el color y grosor del fondo de la barra de vida
        this.fillStyle(0x000000); // Negro
        this.fillRect(this.x, this.y, this.actualWidth, this.height);

        // Configuramos el color y grosor de la barra de vida
        this.fillStyle(0xff0000); // Rojo
        this.fillRect(this.x, this.y, this.width, this.height);

        // Añadimos un borde a la barra de vida
        this.lineStyle(2, 0x000000); // Borde negro
        this.strokeRect(this.x, this.y, this.actualWidth, this.height);
    }

    // Método para actualizar la barra de vida
    updateLife(vidaActual, vidaMaxima) {
        // Comprobamos que la vida maxima, sigue siendo la misma, si no, se actualiza el valor y el valor de la anchura actual, mienrtras la vida maxima sea inferior al cap
        if(this.maxHealth < 20) {
            if(this.maxHealth < vidaMaxima) {
                this.maxHealth = vidaMaxima;
                this.actualWidth = this.maxHealth/this.width;
            }
        }
        else {
            this.actualWidth = this.width;
        }
        // Calculamos la longitud de la barra de vida basada en la vida actual y máxima del jugador
        const longitudBarra = (vidaActual / this.maxHealth) * this.actualWidth;

        // Borramos y volvemos a dibujar la barra de vida con la nueva longitud
        this.clear();
        this.fillStyle(0x000000); // Negro
        this.fillRect(this.x, this.y, this.actualWidth, this.height);
        this.fillStyle(0xff0000); // Rojo
        this.fillRect(this.x, this.y, longitudBarra, this.height);
        this.lineStyle(2, 0x000000); // Borde negro
        this.strokeRect(this.x, this.y, this.width, this.height);
    }    
}