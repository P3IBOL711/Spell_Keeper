

export default class Credits extends Phaser.Scene{

    constructor() {
        super({ key: 'credits' });
    }

    preload(){

    }

    create(){
        this.add.text(180,160)
    }

}