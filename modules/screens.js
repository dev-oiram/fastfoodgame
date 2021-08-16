import { Container } from 'pixi.js-legacy'
import { Food, Dish } from '../modules/objects'


class GameScreen {
    constructor(stage) {
        this.active = false;
        this.container = new Container();
        this.mainStage = stage;

        // Array of Objects for GameScreen pramas: (x,y,width,height,Sprite,additionSprite)
        this.objectArray = [
            { name: "Pie", data: new Food(100,150,70,70,"apple_pie","apple_pie_dish") },
            { name: "Dish", data: new Dish(250,150,70,70,"dish_pile") },
            { name: "Dish", data: new Dish(250,263,70,70,"dish_pile") },
            { name: "Dish", data: new Dish(250,391,70,70,"dish_pile") },
            { name: "Dish", data: new Dish(250,511,70,70,"dish_pile") }
        ]
        this.setup(); // Screen Init
    }

    // Method for getting object from objectArray
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

        // ============== KEY ACTIONS ======================
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
                this.getObj('Pie').right()
            }
        }
        // ============== KEY ACTIONS ======================
    }

    setActive(status) {
        this.container = status
    }

    // Method for adding objects on GameScreen
    addObject(obj) {
        this.objectArray.push(obj)
        // Set Object on Screen
        this.objectArray.forEach(obj => {
            this.container.addChild(obj.data.getSprite())
        });
    }

    // Method for removing objects on GameScreen
    removeObject(obj) {
        this.container.removeChild(obj.getSprite())
        this.container.removeChild(obj.getSpriteDish())
    }

    // Screen Update
    update(delta) {
        // Update objects on Screen
        this.objectArray.forEach((obj,index) => {
            obj.data.update(delta)
            if(obj.data.sprite.x > 700){
                this.objectArray.splice(index, 1);
                this.removeObject(obj.data)
            }
        });
    }
}

export {
    GameScreen
}