import Phaser from "phaser";

export default class weaponDisplay extends Phaser.GameObjects.Sprite {
    /**
        * Constructor del jugador
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */
       constructor(scene, x, y, weaponArt) {
           super(scene, x, y,'weaponDisplay');
           this.scene.add.existing(this);
           this.scene.physics.add.existing(this);
           this.showedWeapon = weaponArt;
       }

       updateDisplay(changedWeapon) {
            this.showedWeapon = changedWeapon;
       }

       preUpdate(t, dt) {
            super.preUpdate(t, dt);

            this.showedWeapon.playIdle();
       }
   }