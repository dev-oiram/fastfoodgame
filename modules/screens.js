import { Container } from 'pixi.js-legacy'
import { Food } from '../modules/objects'
import { config } from '../config/config'


class GameScreen {
    constructor(stage) {
        this.active = false;
        this.container = new Container();
        this.mainStage = stage;

        this.objectArray = [
            { name: "Pie", data: new Food(200,50,70,70,"apple_pie"), }
        ]
        this.setup();
    }

    getObj(name) {
        try{
            let obj = this.objectArray.find(el => el.name == name).data
            return obj
        }
        catch{
            console.error("Error: No object name -> " + name)
        }
    }

    // Screen init
    setup() {
        // Set main Container
        this.mainStage.addChild(this.container)

        // Set Object on Screen
        this.objectArray.forEach(obj => {
            this.container.addChild(obj.data.getSprite())
        });

        window.onkeydown = (key) =>{
            if(key.code == "ArrowDown"){
                this.getObj('Pie').down()
            }
            if(key.code == "ArrowUp"){
                this.getObj('Pie').up()
            }
        }

        window.onkeyup = (key) =>{
            if(key.code == "ArrowRight"){
                console.log("MoveR")
            }
        }
    }

    setActive(status) {
        this.container = status
    }

    // Screen Update
    update(delta) {
        // Update objects on Screen
        this.objectArray.forEach(obj => {
            obj.data.update(delta)
        });
    }
}

export {
    GameScreen
}