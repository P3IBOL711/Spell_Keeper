




export default class SceneManager{

   

    constructor(dg) {
       this.dungeon = dg;
    }


    loadScene(x,y,direction){

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

        this.scene.start(dungeon[y][x].name,{X: x, Y: y, sc: this});
    }







}