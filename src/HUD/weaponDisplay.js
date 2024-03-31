import Phaser from "phaser";

export default class weaponDisplay extends Phaser.GameObjects.Sprite {
    /**
        * Constructor del jugador
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */
    constructor(scene, x, y, initialWeaponName) {
        super(scene, x, y, initialWeaponName);
        this.setScale(7);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.showedWeapon = initialWeaponName; // Inicialmente mostramos este arma
    }

    updateDisplay(newWeaponName) {
        // Cambiar la textura del sprite del arma
        this.setTexture(newWeaponName);
        this.showedWeapon = newWeaponName;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        // Reproducir animación de inactividad
    }
}