
import bg from '../../assets/main_menu/title_bg.png'
import mt from '../../assets/main_menu/main_title.png'
import play from '../../assets/main_menu/play.png'
import playSel from '../../assets/main_menu/play_selected.png'
import font from 'url:../../assets/fonts/VT323Regular.ttf'


export default class MainMenu extends Phaser.Scene{

    constructor() {
        super({ key: 'controlsMenu' });
    }
    
 

    preload(){
        
    }

    create(){
        this.add.image(0,0,'controlsBackground').setOrigin(0).setDepth(0)//Background

        this.add.image(200, 50, 'wKey').setOrigin(0).setDepth(1).setScale(4)
        this.add.image(200, 150, 'aKey').setOrigin(0).setDepth(1).setScale(4)
        this.add.image(200, 250, 'sKey').setOrigin(0).setDepth(1).setScale(4)
        this.add.image(200, 350, 'dKey').setOrigin(0).setDepth(1).setScale(4)
        // let playButton = this.add.image(470,150,'play').setOrigin(0).setDepth(1).setScale(0.35); 
        // let playSelectedButton = this.add.image(470,150,'play_sel').setOrigin(0).setDepth(1).setScale(0.35).setVisible(false); 

        this.backButton = this.add.text(270, 185, '> BACK', { fontFamily: 'pixelFont', fontSize: 60, color: '#000000' , fontStyle: 'bold'});
        /*let nuevoTexto = 
        this.add.text(390, 70, 
            'Spell Keeper', 
            { fontFamily: 'pixelFont', fontSize: 80, color: '#000000' });*/
        //this.add.text(450, 70, 'Spell Keeper',{ fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' })
      //  let hola = this.add.bitmapText(200, 100, 'pixelfont','Bitmap Fonts!', 64);
       // text.setScale(3);

       this.backButton.setInteractive();
       this.backButton.on("pointerover", ()=>{
            this.backButton.setStyle({fill: '#ffffff'})
       })

       this.backButton.on("pointerout", ()=>{
        this.backButton.setStyle({fill: '#000000'})
       })

       this.backButton.on("pointerup", ()=>{
         this.scene.start('mainMenu');
       })

    //    this.controlsButton.setInteractive();
    //    this.controlsButton.on("pointerover", ()=>{
    //         this.controlsButton.setStyle({fill: '#ffffff'})
    //    })

    //    this.controlsButton.on("pointerout", ()=>{
    //     this.controlsButton.setStyle({fill: '#000000'})
    //    })

    //    this.controlsButton.on("pointerup", ()=>{
    //      this.scene.start('armeriaPrueba');
    //    })
    }


    // loadFont(name, url) {
    //     let newFont = new FontFace(name, `url(${url})`);
    //     newFont.load().then(function (loaded) {
    //         document.fonts.add(loaded);
    //     }).catch(function (error) {
    //         return error;
    //     });
    // }
}