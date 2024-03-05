
import bg from '../../assets/main_menu/title_bg.png'


export default class MainMenu extends Phaser.Scene{

    constructor() {
        super({ key: 'mainMenu' });
    }
    
 

    preload(){
        this.load.image('title_bg',bg);
        //this.load.bitmapFont('customFont','../../assets/font/spellkeeper.png','../../assets/font/spellkeeper.xml')
        //this.load.bitmapFont('pixelfont','../../assets/font/pixelfont.png','../../assets/font/Pixeled.xml')
    }
    create(){
        this.add.image(0,0,'title_bg').setOrigin(0).setDepth(0); //Background
        this.add.text(450, 70, 'Spell Keeper',{ fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' })
      //  let hola = this.add.bitmapText(200, 100, 'pixelfont','Bitmap Fonts!', 64);
       // text.setScale(3);
    }


    
  

}