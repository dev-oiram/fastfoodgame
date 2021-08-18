import { Container } from 'pixi.js-legacy'
import { GameBackground, ShownObject, Food, Dish, OneDish, TimeText } from '../modules/objects'
import { foodAssets, sound } from '../config/assets'
import { config } from '../config/config'


const sprtSize = 70
const dishSize = 110
const optionsSize = 40

function randomNumber() {
    let min = 0
    let max = (foodAssets.length)/2
    return parseInt(Math.random() * (max - min) + min)
}

class GameScreen {
    constructor(stage) {
        this.container = new Container();
        this.finish = false
        this.mainStage = stage;
        this.noIncome = false
        this.currentActiveFood = null
        this.currentArrayPosition = 0
        this.foodCount = 50
        this.timeText = new TimeText(60,20,30) // Set Timer

        this.loadBackground() // Load GameScreen Background

        //=========================================
        let foodSelectArray = []
        for (let i = 0; i <= foodAssets.length-1; i=i+2) {
            let obj = { one: foodAssets[i].name, two: foodAssets[i+1].name }
            foodSelectArray.push(obj)
        }

        this.income = new Container()
        this.incomeArray = []
        let xPosition = 195
        for (let i = 0; i <= this.foodCount; i++) {
            xPosition += 55
            let rNum = randomNumber()
            let obj = new Food(xPosition,40,sprtSize,sprtSize,foodSelectArray[rNum].one,foodSelectArray[rNum].two)
            this.incomeArray.push(obj)
        }
        this.incomeArray.forEach(el => {
            this.income.addChild(el.getSprite())
            this.income.addChild(el.getSpriteDish())
        });
        this.container.addChild(this.income)
        //=========================================

        // Array of Objects for GameScreen pramas: (x,y,width,height,Sprite,additionSprite)
        this.objectArray = [
            //{ name: "Pie", data: new Food(100,150,sprtSize,sprtSize,"apple_pie","apple_pie_dish") },
            { name: "StopWatch", data: new ShownObject(30,30,50,50,"stopwatch") },
            { name: "Dish", data: new OneDish(250,150,dishSize,dishSize,"dish2",0) },
            { name: "Dish", data: new OneDish(250,263,dishSize,dishSize,"dish2",1) },
            { name: "Dish", data: new OneDish(250,391,dishSize,dishSize,"dish2",2) },
            // { name: "Dish", data: new OneDish(250,511,dishSize,dishSize,"dish2",3) }
        ]
        this.setup(); // Screen Init
    }

    getSocre() {
        sound.stop('musicStart')
        this.finish = true
        let count = 0
        this.incomeArray.forEach(el => {
            if(el.valid)
                count += 1
        });
        console.log(count)
        console.log("GAMEOVER")
    }

    loadBackground() {
        this.background = new GameBackground(config.gameWidth/2,config.gameHeight/2,
            config.gameWidth,config.gameHeight,"background")

        this.container.addChild(this.background.getSprite())
    }

    // Sets a new current food
    setNewActive() {
        if(this.currentArrayPosition <= this.incomeArray.length - 1){
            this.incomeArray.forEach(obj => {
                if(!obj.getActive())
                    obj.left()
            });
            let newFoodActive = this.incomeArray[this.currentArrayPosition]
            newFoodActive.setActive(true)
            this.currentActiveFood = newFoodActive
            this.currentArrayPosition ++
        }else{
            this.noIncome = true
            this.getSocre()
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
        sound.play('musicStart',{loop:true})

        // Timer
        this.container.addChild(this.timeText.getText())

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

        window.onkeyup = (key) => {
            // Check for timeout
            if(!this.timeText.getTimeOut()){
                if(key.code == "Space"){
                    if(this.currentActiveFood != null){
                        this.currentActiveFood.right()
                        if(this.currentActiveFood.moveRight) { this.setNewActive() }
                    }
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

        if(!this.finish){
            // Check for timeout
            if(!this.timeText.getTimeOut() || this.noIncome){
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
        
                this.timeText.update(delta)
            }else{
                this.getSocre()
            }
        }

    }
}

export {
    GameScreen
}