//Music


export default class Jukebox {

    constructor(scene) {
        this.scene = scene;
    }

    preload() {

    }

    create() {
        this.libintro = this.scene.sound.add('libintro', { delay: 0 })
        this.libloop = this.scene.sound.add('libloop', { loop: true })

    }

    playIntro(level) {
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
            case 'lb':
                this.libloop.play()

                break;
        }
    }




}

