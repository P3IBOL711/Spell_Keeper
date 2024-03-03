import Phaser from 'phaser'

/**
 * Clase que representa la mira del jugador para atacar dentro del juego
 */
export default class PlayerPointer extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
    */

    constructor(scene, x, y) {
        super(scene, x, y, 'playerPointer');

        /** Al crear el pointer, solicitas el bloqueo de raton para usarlo como mira
         *  el puntero cambiara de sprite cuando este en modo melee y modo rango
         *  (preguntar si implementar una teclar para quitar el pointerlock y decir que asi solo te mueves)
         */
        //Preguntar si esta sentencia esta bien puesta
        this.input.on('pointerdown', pointer => {
            this.input.cursor.requestPointerLock();
        });

        //Se actualiza la posicion del puntero
        this.input.on('pointermove', pointer => {
            this.x += pointer.movementX;
            this.y += pointer.movementY;

            this.x = Phaser.Math.Wrap(this.x, 0, game.renderer.width);
            this.y = Phaser.Math.Wrap(this.y, 0, game.renderer.height);
        });
        
        this.setInteractive();
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }
}