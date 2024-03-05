
import bg from '../../assets/main_menu/title_bg.png'
import mt from '../../assets/main_menu/main_title.png'
import play from '../../assets/main_menu/play.png'
import playSel from '../../assets/main_menu/play_selected.png'
import font from '../../assets/fonts/VT323Regular.ttf'


export default class MainMenu extends Phaser.Scene{

    constructor() {
        super({ key: 'mainMenu' });
    }
    
 

    preload(){
        this.load.image('title_bg',bg);
        this.load.image('main_title',mt);
        this.load.image('play',play);
        this.load.image('play_sel',playSel);

        // Archivo .ttf descargable desde
        // https://www.dafont.com/es/happy-donuts.font
        //this.load.add('pixelFont', '../assets/fonts/VT323Regular.ttf')
        
        this.loadFont('pixelFont', font);
        //this.load.bitmapFont('customFont','../../assets/font/spellkeeper.png','../../assets/font/spellkeeper.xml')
        //this.load.bitmapFont('pixelfont','../../assets/font/pixelfont.png','../../assets/font/Pixeled.xml')
    }

    create(){
        this.add.image(0,0,'title_bg').setOrigin(0).setDepth(0); //Background
        this.add.image(390,70,'main_title').setOrigin(0).setDepth(1).setScale(0.35); 
        let playButton = this.add.image(470,150,'play').setOrigin(0).setDepth(1).setScale(0.35); 
        let playSelectedButton = this.add.image(470,150,'play_sel').setOrigin(0).setDepth(1).setScale(0.35).setVisible(false); 
        /*let nuevoTexto = 
        this.add.text(390, 70, 
            'Spell Keeper', 
            { fontFamily: 'pixelFont', fontSize: 80, color: '#000000' });*/
        //this.add.text(450, 70, 'Spell Keeper',{ fontFamily: 'Arial', fontSize: '32px', fill: '#ffffff' })
      //  let hola = this.add.bitmapText(200, 100, 'pixelfont','Bitmap Fonts!', 64);
       // text.setScale(3);

       playButton.setInteractive();
       playButton.on("pointerover", ()=>{
            playButton.setVisible(false);
            playSelectedButton.setVisible(true);
       })

       playButton.on("pointerout", ()=>{
            playButton.setVisible(true);
            playSelectedButton.setVisible(false);
       })

       playButton.on("pointerup", ()=>{
         this.scene.start('armeriaPrueba');
       })
    }


    loadFont(name, url) {
        let newFont = new FontFace(name, `url(${url})`);
        newFont.load().then(function (loaded) {
            document.fonts.add(loaded);
        }).catch(function (error) {
            return error;
        });
    }
}