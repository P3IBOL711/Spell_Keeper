import Phaser from "phaser";

export default class arma extends Phaser.GameObjects.Sprite {
    /**
        * Constructor del jugador
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */
    constructor(scene, x, y, WeaponName, WeaponDamage, equiped) {
        super(scene, x, y, WeaponName)
        this.wName = WeaponName;
        this.id = ''
        this.setDepth(8);
        this.delay = 1000;
        this.isRotating = false;



        this.scene.physics.add.overlap(this, this.scene.player, (weapon) => {
            
                if (weapon.isMelee()) {
                    this.scene.player.takeMeleeWeapon(weapon);
                }
                else {
                    this.scene.player.takeRangedWeapon(weapon);
                }
                weapon.setActive(false);
                weapon.setVisible(false);
                console.log("arma equipada");
        });


        this.setActive(false);
        this.setVisible(false);
    }

    updatePosition(x,y){
        this.x = x
        this.y = y
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    modifiedDmg(weaponMultiplier) {
        this.wDmg = this.wDmg * weaponMultiplier;
    }

    rotateAttack() {
        if(this.isMelee()) {
            let initialRotation = this.angle;
            this.scene.tweens.add({
                targets: this,
                angle:  initialRotation + 60,
                duration: 250,
                onComplete: () => {
                    this.angle = initialRotation;
                }
            });
        }
    }

    playIdle() { }
    isMelee() { }
    manaRegen() { }
    manaCost() { }
}