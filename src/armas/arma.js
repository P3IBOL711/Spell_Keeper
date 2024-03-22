import Phaser from "phaser";

export default class arma extends Phaser.GameObjects.Sprite {
 /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, WeaponName, WeaponDamage) {
        super(scene, x, y, WeaponName)
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.wDmg = WeaponDamage;
        this.delay = 1000;

        this.scene.physics.add.overlap(this, this.scene.player, (weapon) => {
            if(weapon.isMelee()){
                this.scene.player.takeMeleeWeapon(weapon);
            }
            else {
                this.scene.player.takeRangedWeapon(weapon);
            }
        });
    }

    modifiedDmg(weaponMultiplier) {
        this.wDmg = this.wDmg * weaponMultiplier;
    }
}