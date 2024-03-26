import ar_r5 from '../../assets/armory/tiles/ar_r5.json'
import ts from  '../../assets/armory/tiles/armory_tileset.png'
import Trigger from '../trigger';





export default class ARR5 extends Phaser.Scene{

    constructor(sc) {
        super({ key: 'arR5' });
        this.sceneManager = sc;
        this.x = 0;
        this.y = 0;
    }

    init(X,Y,sc){
        this.sceneManager = sc;
        this.x= X;
        this.y = Y;
    }


    preload(){
        this.load.tilemapTiledJSON('tilemap',ar_r5)
        this.load.image('armory_tileset', ts)        
    }



    create(){

        //let hb_n = new Trigger(this,256,0,96,32,this.player,sceneManager.loadScene(x,y,'n'));
        this.cameras.main.setZoom(2.5);
        this.map = this.make.tilemap({
            key: 'tilemap',
            tileHeight: 32,
            tileWidth: 32
        });
        let tileset = this.map.addTilesetImage('armory_tileset');
        let layer = this.map.createLayer('Layer',[tileset])

    }







}