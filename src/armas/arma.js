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
        this.wDmg = WeaponDamage;
        this.wName = WeaponName;
        this.delay = 1000;
        this.isRotating = false;

        this.scene.physics.add.overlap(this, this.scene.player, (weapon) => {
            if(weapon.isMelee()){
                this.scene.player.takeMeleeWeapon(weapon);
            }
            else {
                this.scene.player.takeRangedWeapon(weapon);
            }
        });

        
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);

//        if(this.isMelee()) {
//            let initialRotation = this.angle;
//            this.scene.tweens.add({
//                target: this,
//                angle:  initialRotation + 60,
//                duration: 100,
//                onComplete: () => {
//                    this.angle = initialRotation;
//                }
//            });
//        }
        let playerX = this.scene.player.x;
        let playerY = this.scene.player.y;

        // Rotar el arma alrededor del jugador con una distancia fija y un ángulo de 60 grados
        Phaser.Actions.RotateAroundDistance([this], { x: playerX, y: playerY }, Phaser.Math.DegToRad(60), 50);

        // Si el ángulo de rotación es mayor o igual a 60 grados, restaurar la posición inicial
        if (this.angle >= 60) {
            Phaser.Actions.RotateAroundDistance([this], { x: playerX, y: playerY }, Phaser.Math.DegToRad(-60), 50);
        }
    }

    modifiedDmg(weaponMultiplier) {
        this.wDmg = this.wDmg * weaponMultiplier;
    }

    rotateWeapon() {

    }

    playIdle(){}
    isMelee(){}
    manaRegen(){}
    manaCost(){}
}