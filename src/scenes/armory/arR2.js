import ar_r2 from '../../../assets/armory/tiles/arR2.json'
import b from '../../../assets/armory/tiles/Base.png'
import w from '../../../assets/armory/tiles/Weapons.png'
import Player from '../../player'
import basicRanged from '../../armas/basicRanged.js';
import basicMelee from '../../armas/basicMelee.js';
import FireStaff from '../../armas/fireStaff.js';
import Trigger from '../../trigger.js';


export default class ARR2 extends Phaser.Scene {

    constructor(sc) {
        super({ key: 'arR2' });
        this.x = 0;
        this.y = 0;
        this.loadScene = this.loadScene.bind(this);
    }
    init(obj) {
        this.x = obj.X;
        this.y = obj.Y;
        this.dungeon = obj.dg;
        this.loadScene = this.loadScene.bind(this);
    }

    loadScene(x,y,direction,level,dungeon){

        //Ajustamos las coordenadas
        if (direction === 'n') {
            y -= 1;
        } else if (direction === 's') {
            y += 1;
        } else if (direction === 'e') {
            x += 1;
        } else if (direction === 'w') {
            x -= 1;
        }
        console.log(level+dungeon[y][x].name)

        this.scene.start(level+dungeon[y][x].name,{X: x, Y: y, sc: this});
    }




    preload() {
        this.load.tilemapTiledJSON('tilemap', ar_r2)
        this.load.image('Base', b)
        this.load.image('Weapons', w)
    }



    create() {
       this.scene.stop('arR1')

        this.map = this.make.tilemap({
            key: 'tilemap',
            tileHeight: 32,
            tileWidth: 32
        });
        let base = this.map.addTilesetImage('Base');
        let weapons = this.map.addTilesetImage('Weapons');
        let fondo = this.map.createLayer('Fondo', [base]).setDepth(0)
        let floor = this.map.createLayer('Floor', [base]).setDepth(1)
        let walls = this.map.createLayer('Walls', [base]).setDepth(2).setCollisionByExclusion(-1)
        let cObjects = this.map.createLayer('CObjects', [weapons]).setDepth(3).setCollisionByExclusion(-1)
        let nCObjects = this.map.createLayer('NCObjects', [weapons]).setDepth(4)
        let extra = this.map.createLayer('Extra', [base]).setDepth(5)

        

        let playerX = 300;
        let playerY = 200;

        this.player = new Player(this, playerX, playerY, 0, 0, 1, 0, 1, 0, [new basicMelee(this, playerX, playerY, 1)], [new basicRanged(this, playerX, playerY, 1), new FireStaff(this, playerX, playerY, 10)], 0, 0);
        this.physics.add.collider(this.player, walls)
        this.physics.add.collider(this.player, cObjects)
        this.player.setDepth(6);


        this.cameras.main.setZoom(3);
        this.cameras.main.setBounds(0, 0, 1024, 512)
        this.cameras.main.startFollow(this.player)

        // En Tiled tiene que haber una capa de objetos llamada `capaObjetos`
        for (const objeto of this.map.getObjectLayer('Cosas').objects) {
            // `objeto.name` u `objeto.type` nos llegan de las propiedades del
            // objeto en Tiled
            if (objeto.type === 'Trigger') {
                new Trigger(this,objeto.x, objeto.y,objeto.width, objeto.length,this.player,null);
            }
        }
   

    }







}