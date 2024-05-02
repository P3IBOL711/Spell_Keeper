import Phaser from 'phaser'

/**
 * Clase que representa un enemigo del juego.
 */
export default class FullScreenButton extends Phaser.GameObjects.GameObject {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, image) {
        super(scene, x, y, image);
        this.scene.add.existing(this);

        this.button = this.scene.add.image(200, 235, 'wKey').setOrigin(0).setDepth(1).setScale(5);
        this.button.setInteractive();

        this.button.on("pointerover", ()=>{
            this.button.setScale(1.6)
       })

       this.button.on("pointerout", ()=>{
            this.button.setScale(1.5)
       })

       this.button.on("pointerup", ()=>{
            this.scene.start('mainMenu');
       })
    }
}