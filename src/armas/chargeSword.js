import Phaser from "phaser";

import meleeWeapon from "./meleeWeapon";

export default class ChargeSword extends meleeWeapon {
    /**
        * Constructor del jugador
        * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
        * @param {number} x Coordenada X
        * @param {number} y Coordenada Y
        */
    constructor(scene, x, y) {
        super(scene, x, y, 'chargesword');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.delay = 500;
        this.damage = 4;
        this.level = 0;
        this.hitboxMultiplier = 3;

        this.id = 'chargesword';
        this.setActive(true);
        this.setVisible(true);

        this.anims.create({
            key: 'level0',
            frames: this.anims.generateFrameNumbers('chargesword', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'level1',
            frames: this.anims.generateFrameNumbers('chargesword', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'level2',
            frames: this.anims.generateFrameNumbers('chargesword', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'level3',
            frames: this.anims.generateFrameNumbers('chargesword', { start: 3, end: 4 }),
            frameRate: 15,
            repeat: -1
        });
    }

    preUpdate(t, dt) {
        switch (this.level) {
            case 0:
                this.anims.play('level0')
                break;
            case 1:
                this.anims.play('level1')
                break;
            case 2:
                this.anims.play('level2')
                break;
            case 3:
                this.anims.play('level3')
                break;
        }
        super.preUpdate(t, dt);
    }

    haveSlash() {
        return true;
    }

    attack(target) {
        this.level++;
        if(this.level === 3)
            this.damage = this.damage * 4
        if (this.level > 3){
            this.level = 0
            this.damage = this.damage / 4
        }
        super.attack(target);
    }

    manaRegen() {
        return 20;
    }
}