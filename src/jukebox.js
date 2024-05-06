//Music


export default class Jukebox {

    constructor(scene) {
        this.scene = scene;
        this.music = []
    }

    preload() {

    }

    create() {
        this.main = this.scene.sound.add('maintitle',{loop:true})
        this.treeloop = this.scene.sound.add('treeloop',{loop:true})
        this.tutloop = this.scene.sound.add('tutloop',{loop:true})
        this.libintro = this.scene.sound.add('libintro', { delay: 0 })
        this.gardintro = this.scene.sound.add('gardintro', { delay: 0 })
        this.libloop = this.scene.sound.add('libloop', { loop: true })
        this.gardloop = this.scene.sound.add('gardloop', { loop: true })

        this.music.push( this.treeloop,this.main ,this.tutloop, this.libintro, this.libloop,this.gardintro,this.gardloop);
    }

    playIntro(level) {
        this.stopAllMusic()
        switch (level) {
            case 'lb':

                this.libintro.play()
                this.libintro.once("complete", () => {

                    this.playLoop(level)

                });

                break;
            case 'gr':
                this.gardintro.play()
                this.gardintro.once("complete", () => {

                    this.playLoop(level)

                });

            break;
        }

    }

    playLoop(level) {
        switch (level) {

            case 'ar':  
                this.tutloop.play()
                break;
            case 'lb':
                this.libloop.play()
                break;
            case 'gr':
                this.gardloop.play()
            break;
        }
    }

    playTree(){
        this.treeloop.play();
    }

    playMainTheme(){
        this.main.play()
    }


    stopAllMusic() {

        for(let song of this.music)
            song.stop()
    }

}

