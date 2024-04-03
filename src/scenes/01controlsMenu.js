import Phaser from 'phaser'



export default class ControlsMenu01 extends Phaser.Scene{

    constructor() {
        super({ key: 'controlsMenu01' });
    }

    preload(){
        
    }

    create(){
        this.add.image(0,0,'controlsBackground').setOrigin(0).setDepth(0)//Background

        this.add.image(190,5,'titleDecoration').setOrigin(0).setDepth(1).setScale(1.5)//Title decoration

        this.add.image(200, 235, 'fKey').setOrigin(0).setDepth(1).setScale(5)
        this.add.image(450, 235, 'qKey').setOrigin(0).setDepth(1).setScale(5)

        this.add.text(400, 28, 'CONTROLS', { fontFamily: 'pixelFont', fontSize: 60, color: '#5e1675ff' , fontStyle: 'bold'}).setDepth(1);
        this.add.text(75, 33, 'BACK', { fontFamily: 'pixelFont', fontSize: 40, color: '#5e1675ff' , fontStyle: 'bold'});
        this.add.text(75, 405, 'PREVIOUS', { fontFamily: 'pixelFont', fontSize: 40, color: '#5e1675ff' , fontStyle: 'bold'});
        this.add.text(155, 190, 'OPEN CHEST', { fontFamily: 'pixelFont', fontSize: 50, color: '#5e1675ff' , fontStyle: 'bold'});
        this.add.text(155, 190, 'OPEN CHEST', { fontFamily: 'pixelFont', fontSize: 50, color: '#5e1675ff' , fontStyle: 'bold'});
        this.add.text(445, 190, 'CHANGE WEAPON', { fontFamily: 'pixelFont', fontSize: 50, color: '#5e1675ff' , fontStyle: 'bold'});
        // Buttons
        this.backButton = this.add.image(18, 30, 'homeButton').setOrigin(0).setDepth(1).setScale(1.5);

       this.backButton.setInteractive();
       this.backButton.on("pointerover", ()=>{
            this.backButton.setScale(1.6)
       })

       this.backButton.on("pointerout", ()=>{
            this.backButton.setScale(1.5)
       })

       this.backButton.on("pointerup", ()=>{
            this.scene.start('mainMenu');
       })

       this.previousButton = this.add.image(18, 400, 'nextButton').setFlipX(true).setOrigin(0).setDepth(1).setScale(1.5);
       this.previousButton.setInteractive();
       this.previousButton.on("pointerover", ()=>{
            this.previousButton.setScale(1.6)
       })

       this.previousButton.on("pointerout", ()=>{
            this.previousButton.setScale(1.5)
       })

       this.previousButton.on("pointerup", ()=>{
            this.scene.start('controlsMenu00');
       })
    }
}