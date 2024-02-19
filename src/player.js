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
    constructor(scene, x, y) {
        super(scene,x,y, 'player');
        //Estadisticas del jugador
        /*
            Vida
            Modificadores de vida

            Mana
            Modificadores de mana

            Multiplicadores a las armas

            Velocidad de movimiento
            Modificadores de la velocidad de movimiento
            Multiplicadores de la velocidad de movimiento

            Suerte
            Modificadores ocultos de la suerte
        */

        //CAPADO inferiormente a 1 y superiormente a 10, cada numero son 2 golpes
        this.lifeModifier = 0;
        this.life = 3 + this.lifeModifier;

        //CAPADO inferiormente a 10 y superiormente a 1000
        //Cuando no se tiene mana suficiente para hacer el ataque, se hace igual con una potencia proporcional al mana gastado de lo que cuesta el ataque
        this.manaModifier = 0;
        this.mana = 250 + this.manaModifier;

        this.weaponMultiplier = 1;

        //CAPADO, definir caps
        this.MovSpeedModifier = 0;
        this.MovSpeedMultiplier = 1;
        this.MovSpeed = (300 + this.MovSpeedModifier)*this.MovSpeedMultiplier;

        this.hiddenLuckModifier = 0;
        this.luck = 5;

        this.scene.add.existing(this);
        
    }
    constructor(scene, x, y) {
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
        this.label.text = 'Score: ' + this.score;
    }

    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
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
        }
    }

}
