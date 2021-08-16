import { Container } from 'pixi.js-legacy'
import { Food, Dish } from '../modules/objects'
import { config } from '../config/config'


class GameScreen {
    constructor(stage) {
        this.active = false;
        this.container = new Container();
        this.mainStage = stage;

        this.objectArray = [
            { name: "Pie", data: new Food(200,150,70,70,"apple_pie","apple_pie_dish") },
            { name: "Dish", data: new Dish(300,150,70,70,"dish") },
            { name: "Dish", data: new Dish(300,263,70,70,"dish") },
            { name: "Dish", data: new Dish(300,391,70,70,"dish") },
            { name: "Dish", data: new Dish(300,511,70,70,"dish") }
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
            try{
                this.container.addChild(obj.data.getSpriteDish())
            }catch{}
        });

        window.onkeydown = (key) =>{
            if(key.code == "ArrowDown"){
                this.getObj('Pie').down()
                // let obj = { 
                //     name: "PieDish", 
                //     data: new Dish(this.getObj('Pie').getSprite().x+300,150,70,70,"apple_pie_dish") 
                // }
                // this.addObject(obj)
            }
            if(key.code == "ArrowUp"){
                this.getObj('Pie').up()
            }
        }

        window.onkeyup = (key) =>{
            if(key.code == "ArrowRight"){
                this.getObj('Pie').right()
            }
        }
    }

    setActive(status) {
        this.container = status
    }

    addObject(obj) {
        this.objectArray.push(obj)
        // Set Object on Screen
        this.objectArray.forEach(obj => {
            this.container.addChild(obj.data.getSprite())
        });
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