

export default class WeaponInfo extends Phaser.GameObjects.Graphics{



    constructor(scene, x, y) {
        super(scene);
        this.scene.add.existing(this);
        
        this.setDepth(1000)
      
        this.y = y;
        this.x = x;
        
        this.text = this.scene.add.text(x + 20, y - 10,"" , { fontFamily: 'pixelFont', fontSize: 30, color: '#ffffffff' }).setDepth(100).setVisible(false);
  
    }

    activates(name) {
        this.text.setText(name);
        this.text.setVisible(true);
        this.scene.time.addEvent({
            delay: 4000,
            callback: this.deactivate,
            callbackScope: this
        })
    }

    deactivate(){
        this.text.setVisible(false);
    }

    

    placeName(name){
       
    }




}