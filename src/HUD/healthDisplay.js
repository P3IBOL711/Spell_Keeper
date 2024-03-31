import Phaser from 'phaser';

export default class HealthDisplay extends Phaser.GameObjects.Group { 
    /**
        * Constructor del jugador
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */
    constructor(scene, x, y, initialHealth) {
        super(scene);

        this.maxHealth = 20; // 20 de vida como maximo
        this.currentHealth = initialHealth;
        //Crea todo los corazones y los pone inactivos y no visibles
        this.hearts = this.createMultiple ({
            key: 'ui-heart-full',
            setXY: {
                x: x,
                y: y,
                stepX: 64
            },
            frameQuantity: this.maxHealth / 2, // Cantidad de corazones
            active: false,
            visible: false,
        });

        //la cantidad de corazones iniciales, se ponen activos y visibles
        for(let i = 0; i < this.currentHealth / 2; i ++) {
            this.hearts[i].setScale(3);
            this.hearts[i].setActive(true).setVisible(true);
        }

        this.updateHearts();
    }

    receiveDamage(damage) {
        this.currentHealth -= damage;

        if (this.currentHealth < 0) {
            this.currentHealth = 0;
        }

        this.updateHearts();
    }

    heal(healing) {
        this.currentHealth += healing;

        if (this.currentHealth >= this.maxHealth) {
            this.currentHealth = this.maxHealth;
        }

        this.updateHearts();
    }

    updateHearts() {
        for(let i = 0; i < this.getLength(); i++) {
            let heart = this.hearts[i];
            if(i < this.currentHealth / 2) {
                if(this.currentHealth >= (i + 1) * 2)
                   heart.setTexture('ui-heart-full');
                else if(this.currentHealth === (i + 1) * 2 - 1)
                   heart.setTexture('half-ui-heart');
                else
                   heart.setTexture('ui-heart-empty');
                if(!heart.active) {
                    heart.setScale(3);
                    heart.setActive(true).setVisible(true);
                }
            }
            else {
                heart.setActive(false).setVisible(false);
            }
        }
    }
}