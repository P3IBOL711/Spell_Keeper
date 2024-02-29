import Star from './star.ts';
import Phaser from 'phaser'

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, lifeMod, manaMod, weaponMult, moveMod, moveMult, luckMod) {
        super(scene,x,y, 'player');

        //CAPADO inferiormente a 1 y superiormente a 10, cada numero son 2 golpes
        this.lifeModifier = lifeMod;
        this.life = 3 + this.lifeModifier;

        //CAPADO inferiormente a 10 y superiormente a 1000
        //Cuando no se tiene mana suficiente para hacer el ataque, se hace igual con una potencia proporcional al mana gastado de lo que cuesta el ataque
        this.manaModifier = manaMod;
        this.mana = 250 + this.manaModifier;

        this.weaponMultiplier = weaponMult;

        //CAPADO, definir caps
        this.MovSpeedModifier = moveMod;
        this.MovSpeedMultiplier = moveMult;
        this.MovSpeed = (100 + this.MovSpeedModifier)*this.MovSpeedMultiplier;

        this.hiddenLuckModifier = luckMod;
        this.luck = 5;

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walking_down',
            frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walking_up',
            frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walking_left',
            frames: this.anims.generateFrameNumbers('player_spritesheet', { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1
        });

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(3);
        
        this.body.setCollideWorldBounds();
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        /*
        super(scene, x, y, 'player');
        this.score = 0;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // Queremos que el jugador no se salga de los límites del mundo
        this.body.setCollideWorldBounds();
        this.speed = 300;
        this.jumpSpeed = -400;
        // Esta label es la UI en la que pondremos la puntuación del jugador
        this.label = this.scene.add.text(10, 10, "");
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.updateScore();
        */
    }

    /**
     * El jugador ha recogido una estrella por lo que este método añade un punto y
     * actualiza la UI con la puntuación actual.
     */
    point() {
        this.score++;
        this.updateScore();
    }

    /**
     * Actualiza la UI con la puntuación actual
     */
    updateScore() {
        //this.label.text = 'Score: ' + this.score;
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        /*
        if (this.cursors.up.isDown && this.body.onFloor()) {
            this.body.setVelocityY(this.jumpSpeed);
        }
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        }
        else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        }
        else {
            this.body.setVelocityX(0);
        }*/


        //MOVIMIENTO DEL JUGADOR (de momento es estatico)
        //preguntar si es else if y ademas pregutnar que pasa si solo pones if, (moverse en 8 direcciones)
        if(this.cursors.up.isDown){
            this.play('walking_up', true);
            this.body.setVelocityY(-this.MovSpeed);
        }
        else if(this.cursors.down.isDown){
            this.play('walking_down', true);
            this.body.setVelocityY(this.MovSpeed);
        }
        else if(this.cursors.left.isDown){
            this.setFlipX(true);
            this.play('walking_left', true);
            this.body.setVelocityX(-this.MovSpeed);
        }
        else if(this.cursors.right.isDown){
            this.setFlipX(false);
            this.play('walking_left', true);
            this.body.setVelocityX(this.MovSpeed);
        }

        else {
            this.play('idle', true);
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }
        /*
        //BOTON DEL ESCUDO, IMPLEMENTAR
        if(this.cursors.shift.isDown){

        }
        */
    }

}
