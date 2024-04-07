import Phaser from "phaser";

export default class item extends Phaser.GameObjects.Sprite {
    /**
        * Constructor del jugador
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */
    constructor(scene, x, y, itemName) {
        super(scene, x, y, itemName)
        this.iName = itemName;
        this.id = ''
        this.setDepth(8);

        //Ver que coño hace esto
        let overlapCollider = this.scene.physics.add.overlap(this, this.scene.player, (weapon) => {

        });


        this.setActive(false);
        this.setVisible(false);
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    isActive() {
        return false;
    }
}