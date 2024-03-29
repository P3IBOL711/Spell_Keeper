
import b from '../../assets/armory/tiles/Base.png'
import w from '../../assets/armory/tiles/Weapons.png'
import f from '../../assets/misc/fire.png'

import Player from '../player.js'
import basicRanged from '../armas/basicRanged.js';
import basicMelee from '../armas/basicMelee.js';
import FireStaff from '../armas/fireStaff.js';
import Trigger from '../trigger.js';
import CollisionHitbox from '../collisionHitbox.js';
import EnemySpawner from '../EnemySpawner.js';
import Fire from '../fire.js'
import Chest from '../chest.js';



export default class Room extends Phaser.Scene {



    constructor(obj) {
        super({ key: obj.key });
       
        this.x = 0;
        this.y = 0;
        this.loadScene = this.loadScene.bind(this);
        this.nSpawn = { x: 0, y: 0 };
        this.sSpawn = { x: 0, y: 0 };
        this.eSpawn = { x: 0, y: 0 };
        this.wSpawn = { x: 0, y: 0 };
        this.cSpawn = { x: 0, y: 0 };
        this.level = obj.level
        
      
    }

    init(obj) {
      
        this.key = obj.key
        this.x = obj.X;
        this.y = obj.Y;
        this.dungeon = obj.dg;
        this.direction = obj.dir;
        this.numberOfEnemies = 0;
        this.chestOpened = false;
        this.loadScene = this.loadScene.bind(this);
        this.cache.tilemap.remove('tilemap');
        this.saveStateMatrix = obj.SSM
        this.fireArray = [] //El array que guarda los fuegos en el nivel para destruirlos una vez matados a todos los bichos
    }


    preload() {
        this.load.image('Base', b)
        this.load.image('Weapons', w)
        this.load.image('fire',f)
     
    }


    loadScene(x, y, direction, level, dungeon) {

        //Ajustamos las coordenadas
        if (direction === 'n') {
            y -= 1;
            direction = 's'
        } else if (direction === 's') {
            y += 1;
            direction = 'n'
        } else if (direction === 'e') {
            x += 1;
            direction = 'w'
        } else if (direction === 'w') {
            x -= 1;
            direction = 'e'
        }
        // console.log(level + dungeon[y][x].name)
        this.map.removeAllLayers()
        this.map.destroy()
        
        this.unloadScene(this.key)
        this.scene.start(level + dungeon[y][x].name, { X: x, Y: y, dg: dungeon, dir: direction,SSM:this.saveStateMatrix });
    }



    create() {

        if (this.dungeon[this.y][this.x].visited === false)
            this.dungeon[this.y][this.x].visited = true
        else{
            this.loadSceneState()
        }

        //let hb_n = new Trigger(this,256,0,96,32,this.player,sceneManager.loadScene(x,y,'n'));
        //LOADING TILES
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
        let extra = this.map.createLayer('Extra', [weapons]).setDepth(5)

        //DETERMINE PLAYER SPAWN
        let playerX = 300;
        let playerY = 200;

        this.loadPlayerSpawn();

        switch (this.direction) {
            case 'n':
                playerX = this.nSpawn.x; playerY = this.nSpawn.y;
                break;
            case 's':
                playerX = this.sSpawn.x; playerY = this.sSpawn.y;
                break;
            case 'e':
                playerX = this.eSpawn.x; playerY = this.eSpawn.y;
                break;
            case 'w':
                playerX = this.wSpawn.x; playerY = this.wSpawn.y;
                break;
            case 'c':
                playerX = this.cSpawn.x; playerY = this.cSpawn.y;
                break;
        }

        this.enviromental = this.add.group()


        this.player = new Player(this, playerX, playerY, 0, 0, 1, 0, 1, 0, [new basicMelee(this, playerX, playerY, 1)], [new basicRanged(this, playerX, playerY, 1), new FireStaff(this, playerX, playerY, 10)], 0, 0);
        this.physics.add.collider(this.player, walls)
        this.physics.add.collider(this.player, cObjects)
        this.player.setDepth(6);

        this.enemies = this.add.group()

        //TRIGGERS AND STUFF
        this.loadObjects();


        this.cameras.main.setZoom(3);
        this.cameras.main.setBounds(0, 0, 1024, 512)
        this.cameras.main.startFollow(this.player)







    }

    loadObjects() {
        // En Tiled tiene que haber una capa de objetos llamada `capaObjetos`
        for (const objeto of this.map.getObjectLayer('Cosas').objects) {
            // `objeto.name` u `objeto.type` nos llegan de las propiedades del
            // objeto en Tiled
            if (objeto.type === 'Trigger') {
                switch (objeto.properties[0].value) {
                    case 'n':
                        new Trigger(this, objeto.x + objeto.width / 2, objeto.y + 16, objeto.width, objeto.height, this.player, this.level, this.x, this.y, this.loadScene, 'n', this.dungeon);
                        break;
                    case 's':
                        new Trigger(this, objeto.x + objeto.width / 2, objeto.y + 16, objeto.width, objeto.height, this.player, this.level, this.x, this.y, this.loadScene, 's', this.dungeon);
                        break;
                    case 'e':
                        new Trigger(this, objeto.x + objeto.width / 2, objeto.y + 16, objeto.width, objeto.height, this.player, this.level, this.x, this.y, this.loadScene, 'e', this.dungeon);
                        break;
                    case 'w':
                        new Trigger(this, objeto.x + objeto.width / 2, objeto.y + 16, objeto.width, objeto.height, this.player, this.level, this.x, this.y, this.loadScene, 'w', this.dungeon);
                        break;
                }

            } else if (objeto.type === 'Hitbox') {
                new CollisionHitbox(this, objeto.x + objeto.width / 2, objeto.y + objeto.height / 2, objeto.width, objeto.height)
            } else if (objeto.type === 'EnemySpawn') {
                if (this.numberOfEnemies !== -1) {
                    new EnemySpawner(this, objeto.x, objeto.y, this.player)
                    this.numberOfEnemies++
                }
            }else if(objeto.type === 'Fire'){
                if(this.numberOfEnemies !== -1)
                this.fireArray.push(new Fire(this,objeto.x + objeto.width / 2, (objeto.y + objeto.height / 2)-32 , objeto.width, objeto.height))
            }else  if(objeto.type === 'Chest'){
                new Chest(this,objeto.x+ objeto.width / 2,objeto.y- objeto.height / 2,objeto.width,objeto.height,this.player,this.chestOpened)
            }
        }
    }

    enemyHasDied() {
        this.numberOfEnemies--;
        if (this.numberOfEnemies <= 0){
            this.numberOfEnemies = -1; //Habitacion limpia

            for(let fire of this.fireArray){
                fire.destroySprite();
                fire.destroy();
            }
        }
    }

    chestWasOpened(){
        this.chestOpened = true;
    }

    loadPlayerSpawn() {
        for (const objeto of this.map.getObjectLayer('Cosas').objects) {
            // `objeto.name` u `objeto.type` nos llegan de las propiedades del
            // objeto en Tiled
            if (objeto.type === 'PlayerSpawn') {
                switch (objeto.properties[0].value) {
                    case 'n':
                        this.nSpawn.x = objeto.x; this.nSpawn.y = objeto.y;
                        break;
                    case 's':
                        this.sSpawn.x = objeto.x; this.sSpawn.y = objeto.y;
                        break;
                    case 'e':
                        this.eSpawn.x = objeto.x; this.eSpawn.y = objeto.y;
                        break;
                    case 'w':
                        this.wSpawn.x = objeto.x; this.wSpawn.y = objeto.y;
                        break;
                    case 'c':
                        this.cSpawn.x = objeto.x; this.cSpawn.y = objeto.y;
                        break;
                }
            }
        }
    }

    saveSceneState() {
        let savedSceneState = {
            // Save relevant scene state here
            // For example:
            numberOfEnemies: this.numberOfEnemies,
            chestOpened: this.chestOpened
        };

        this.saveStateMatrix[this.y][this.x] = savedSceneState
    }

    loadSceneState() {
        let savedSceneState = this.saveStateMatrix[this.y][this.x]
        if (savedSceneState) {
            this.numberOfEnemies = savedSceneState.numberOfEnemies
            this.chestOpened = savedSceneState.chestOpened
        }
    }

    // Unload scene
    unloadScene(sceneKey) {
        this.saveSceneState();
        this.scene.stop(sceneKey);
    }









}