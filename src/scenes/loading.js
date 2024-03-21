
import bg from '../../assets/main_menu/title_bg.png'
import mt from '../../assets/main_menu/main_title.png'
import play from '../../assets/main_menu/play.png'
import playSel from '../../assets/main_menu/play_selected.png'
import font from 'url:../../assets/fonts/VT323Regular.ttf'


export default class Loading extends Phaser.Scene{

    constructor() {
        super({ key: 'loading' });
    }

    preload(){
        
    }

    create(){
        
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