import PoisonousGoblin from "./enemies/poisonousGoblin"
import Knight from "./enemies/knight"
import Skeleton from "./enemies/archerSkeleton"
import BossTree from './enemies/bossTree/bossTree'
import EvilWizard from "./enemies/evilWizard"

export default class EnemySpawner {

    constructor(scene,x,y,target){
        this.enemyPool = [BossTree]
        this.scene = scene
        this.x = x
        this.y = y
        this.target = target
        //this.scene.add.existing(this);
        let randomIndex = Math.floor(Math.random() * this.enemyPool.length);
        let randomEnemy = this.enemyPool[randomIndex];
        new randomEnemy(this.scene,this.x,this.y,this.target);
        
    }



    

}