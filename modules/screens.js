import { Container, TilingSprite } from 'pixi.js-legacy'
import { Food, Dish } from '../modules/objects'


const sprtSize = 70

class GameScreen {
    constructor(stage) {
        this.container = new Container();
        this.mainStage = stage;
        this.currentActiveFood = null
        this.currentArrayPosition = 0

        //===================
        this.income = new Container()
        this.incomeArray = []
        let xPosition = 160
        for (let i = 0; i <= 10; i++) {
            xPosition += 55
            let obj = new Food(xPosition,40,sprtSize,sprtSize,"apple_pie","apple_pie_dish")
            this.incomeArray.push(obj)
        }
        this.incomeArray.forEach(el => {
            this.income.addChild(el.getSprite())
            this.income.addChild(el.getSpriteDish())
        });
        this.container.addChild(this.income)
        //====================

        // Array of Objects for GameScreen pramas: (x,y,width,height,Sprite,additionSprite)
        this.objectArray = [
            //{ name: "Pie", data: new Food(100,150,sprtSize,sprtSize,"apple_pie","apple_pie_dish") },
            { name: "Dish", data: new Dish(250,150,sprtSize,sprtSize,"dish_pile") },
            { name: "Dish", data: new Dish(250,263,sprtSize,sprtSize,"dish_pile") },
            { name: "Dish", data: new Dish(250,391,sprtSize,sprtSize,"dish_pile") },
            { name: "Dish", data: new Dish(250,511,sprtSize,sprtSize,"dish_pile") }
        ]
        this.setup(); // Screen Init
    }

    // Sets a new current food
    setNewActive() {
        if(this.currentArrayPosition <= this.incomeArray.length - 1){
            console.log(this.currentArrayPosition)
            this.incomeArray.forEach(obj => {
                if(!obj.active)
                    obj.left()
            });
            let newFoodActive = this.incomeArray[this.currentArrayPosition]
            newFoodActive.setActive(true)
            this.currentActiveFood = newFoodActive
            this.currentArrayPosition ++
        }
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


        this.setNewActive()

        // ============== KEY ACTIONS ======================
        window.onkeydown = (key) =>{
            if(key.code == "ArrowDown"){
                if(this.currentActiveFood != null)
                    this.currentActiveFood.down()
            }
            if(key.code == "ArrowUp"){
                if(this.currentActiveFood != null)
                    this.currentActiveFood.up()
            }
        }

        window.onkeyup = (key) =>{
            if(key.code == "ArrowRight"){
                if(this.currentActiveFood != null){
                    this.currentActiveFood.right()
                    this.setNewActive()
                }
            }
        }
        // ============== KEY ACTIONS ======================
    }

    setActive(status) {
        this.container.visible = status
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

        this.incomeArray.forEach((obj,index) => {
            obj.update(delta)
        });
    }
}

export {
    GameScreen
}