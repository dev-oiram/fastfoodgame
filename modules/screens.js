import { Container } from 'pixi.js-legacy'
import { Element } from '../modules/objects'
import { config } from '../config/config'

class GameScreen {
    constructor(stage) {
        this.active = false;
        this.container = new Container();
        this.mainStage = stage;
        this.setup();
    }

    // Screen init
    setup() {
        this.mainStage.addChild(this.container)
        
        this.redBox = new Element(config.gameWidth/2,config.gameHeight/2,50,50,"a_redBox")
        this.container.addChild(this.redBox.getSprite())

        window.onkeydown = (key) =>{
            if(key.code == "ArrowRight"){
                this.redBox.moveRight(true)
            }
        }

        window.onkeyup = (key) =>{
            if(key.code == "ArrowRight"){
                this.redBox.moveRight(false)
            }
        }
    }

    setActive(status) {
        this.container = status
    }

    // Screen Update
    update(delta) {
        this.redBox.update(delta)
    }
}

export {
    GameScreen
}