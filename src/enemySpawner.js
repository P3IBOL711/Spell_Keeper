import PoisonousGoblin from "./enemies/poisonousGoblin"
import Knight from "./enemies/knight"
import Skeleton from "./enemies/archerSkeleton"
import MagicSkeleton from "./enemies/magicSkeleton"
import StandardSkeleton from "./enemies/standardSkeleton"
import Slime from "./enemies/slime"
import CarnivorousPlant from "./enemies/carnivorousPlant"
import Book from "./enemies/book"
import LavaGolem from "./enemies/lavaGolem"

export default class EnemySpawner {

    constructor(scene, x, y, target, level) {
        if (level === 'lb')
            this.enemyPool = [MagicSkeleton, Knight, StandardSkeleton, Skeleton,Book]
        else if (level === 'gr')
            this.enemyPool = [PoisonousGoblin,Slime,CarnivorousPlant,LavaGolem]
        else 
            this.enemyPool = [Skeleton,Knight,PoisonousGoblin]
            this.scene = scene
        this.x = x
        this.y = y
        this.target = target
        //this.scene.add.existing(this);
        let randomIndex = Math.floor(Math.random() * this.enemyPool.length);
        let randomEnemy = this.enemyPool[randomIndex];
        new randomEnemy(this.scene, this.x, this.y, this.target);

    }





}