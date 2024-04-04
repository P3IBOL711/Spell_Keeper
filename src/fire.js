import Phaser from 'phaser'

export default class Fire extends Phaser.GameObjects.Zone {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el enemigo
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
    */

    constructor(scene, x, y, width, height,rotation) {
        super(scene, x, y+8, width, height/2);
        
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.angle = rotation
        this.body.setImmovable(true)

        this.collider =  this.scene.physics.add.collider( this.scene.enviromental,this,(obj) => {
            if(obj.isProjectile())
                obj.destroy();
        });

         this.sprite = this.scene.add.sprite(x,y,'fire').setDepth(7);
         this.sprite.angle = -rotation
        
    }

    destroySprite(){
        this.sprite.destroy();
    }
       

    isProjectile(){
        return false;
    }
    
}

