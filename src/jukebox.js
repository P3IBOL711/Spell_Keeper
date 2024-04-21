//Music


export default class Jukebox {

    constructor(scene) {
        this.scene = scene;
        this.music = []
    }

    preload() {

    }

    create() {
        this.tutloop = this.scene.sound.add('tutloop',{loop:true})
        this.libintro = this.scene.sound.add('libintro', { delay: 0 })
        this.libloop = this.scene.sound.add('libloop', { loop: true })

        this.music.push(this.tutloop, this.libintro, this.libloop);
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
        }
    }


    stopAllMusic() {

        for(let song of this.music)
            song.stop()
    }

}

