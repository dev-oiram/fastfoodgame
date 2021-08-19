import { Container } from 'pixi.js-legacy'
import { GameBackground, ShownObject, Food, Dish, OneDish, TimeText, ScoreText, Button_start } from '../modules/objects'
import { foodAssets, sound } from '../config/assets'
import { config } from '../config/config'

import { animSprite } from '../modules/simpleSprite'


const sprtSize = 70
const dishSize = 110
const optionsSize = 40
const timeRecord = 30 // Record: 25

function randomNumber() {
    let min = 0
    let max = (foodAssets.length)/2
    return parseInt(Math.random() * (max - min) + min)
}

// Game Title Screen
class GameTitleScreen {
    constructor(stage) {
        this.container = new Container();
        this.mainStage = stage;
        this.active = true
        this.gameScreen = false
        this.init = true

    }

    setup() {
        this.active = true
        this.gameScreen = false

        sound.play('titleMusic',{loop:true,volume:0.50})
        this.mainStage.addChild(this.container)
        this.loadBackground()

        this.btn_start = new Button_start(680,405,104,43,'btn_start').getSprite()
        this.btn_start.on('pointerdown', () => {
            this.gameScreen = true
            sound.stop('titleMusic')
        });
        
        this.container.addChild(this.btn_start)
    }

    loadBackground() {
        this.background = new GameBackground(config.gameWidth/2,config.gameHeight/2,
            config.gameWidth,config.gameHeight,"backgroundTitle")

        this.container.addChild(this.background.getSprite())
    }

    update(delta) {
        if(this.init) {
            this.init = false
            this.setup()
        }
    }
}

// Game Screen
class GameScreen {
    constructor(stage) {
        this.container = new Container();
        this.titleScreen = false
        this.score = 0
        this.finish = false
        this.init = false
        this.initActive = false
        this.active = false
        this.mainStage = stage;
        this.noIncome = false
        this.currentActiveFood = null
        this.currentArrayPosition = 0
        this.foodCount = 50
        this.timeText = new TimeText(60,20,timeRecord) // Set Timer Record:27 (also line: 200)

        // Pre-Start Screen
        this.prestartScreen = new Container();
        this.setprestartScreen()

        //Score Screen
        this.scoreScreen = new Container();
        this.setScoreScreen()

        //Victory Screen
        this.winnerScreen = new Container();
        this.setVictoryScreen()

        // Set main Container
        this.mainStage.addChild(this.container)

    }

    setprestartScreen() {
        this.prestart_background = new GameBackground(config.gameWidth/2,config.gameHeight/2,
            config.gameWidth,config.gameHeight,"prestartScreen")

        window.onkeyup = (key) => {
            if(key.code == "KeyB" && this.prestartScreen.visible){
                this.prestartScreen.visible = false
                this.init = true
            }
        }
        
        this.prestartScreen.addChild(this.prestart_background.getSprite())
        this.container.addChild(this.prestartScreen)
    }

    setVictoryScreen() {
        this.winner_background = new GameBackground(config.gameWidth/2,config.gameHeight/2,
            config.gameWidth,config.gameHeight,"winnerScreen")

        this.btn_ok = new Button_start(530,430,104,43,'btn_ok').getSprite()
        this.btn_ok.on('pointerdown', () => {
            sound.stop('victoryMusic')
            this.winnerScreen.visible = false
            this.titleScreen = true
            this.active = false
            this.initActive = true
            this.prestartScreen.visible = true
        });

        // ============ Animation Sprites =========================
        this.anim1 = animSprite('sprite',280,380,128,128,5,0.08)
        this.anim1.play()

        this.anim2 = animSprite('pin',530,150,64,64,5,0.08)
        this.anim2.play()
        // ============ Animation Sprites =========================
        
        this.winnerScreen.addChild(this.winner_background.getSprite(),this.btn_ok,this.anim1,this.anim2)
    }

    setScoreScreen() {
        this.score_background = new GameBackground(config.gameWidth/2,config.gameHeight/2,
            config.gameWidth,config.gameHeight,"scoreScreen")

        this.btn_start = new Button_start(535,320,104,43,'btn_ok').getSprite()
        this.btn_start.on('pointerdown', () => {
            this.scoreScreen.visible = false
            this.prestartScreen.visible = true
        });
        
        this.scoreTime = new ScoreText(415,282,"0")
        this.scoreCount = new ScoreText(432,375,"0")

        this.scoreScreen.addChild(this.score_background.getSprite(),this.scoreTime.getText(),this.scoreCount.getText(),this.btn_start)
    
    }

    finishGame() {        
        sound.stop('musicStart')
        this.finish = true
        let count = 0
        this.incomeArray.forEach(el => {
            if(el.valid)
                count += 1
        });
        this.score = count
        this.timeText.setTimeOut() // Stop timer
        if(this.timeText.getTime() <= 0)
            this.scoreTime.setText("TimeOut")
        else
            this.scoreTime.setText(this.timeText.getTime())
        
        this.scoreCount.setText(this.score+"/50")

        // Check for Victory or GameOver
        if(this.score == 50 && this.timeText.getTime() >= 0){
            sound.play('victoryMusic',{loop:true})
            this.winnerScreen.visible = true
        }else{
            this.scoreScreen.visible = true
        }

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
            this.finishGame()
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
        this.titleScreen = false
        this.score = 0
        this.finish = false
        this.noIncome = false
        this.currentActiveFood = null
        this.currentArrayPosition = 0
        this.foodCount = 50
        this.timeText = new TimeText(60,20,timeRecord) // Set Timer Record:27 (also line: 77)

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


        sound.play('musicStart',{loop:true,volume:0.10})

        // Timer
        this.container.addChild(this.timeText.getText())

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

            if(key.code == "KeyB" && this.prestartScreen.visible){
                this.prestartScreen.visible = false
                this.init = true
            }
        }
        // ============== KEY ACTIONS ======================

        
        // Set Score Screen at last
        this.container.addChild(this.prestartScreen)

        this.container.addChild(this.scoreScreen)
        this.container.addChild(this.winnerScreen)
        this.winnerScreen.visible = false
        this.scoreScreen.visible = false
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

        if(this.init) {
            this.init = false
            this.active = true
            this.setup()
        }


        if(this.active){
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


            // Check for timeout
            if(this.timeText.getTimeOut() || this.noIncome){
                if(!this.finish)
                    this.finishGame()
            }
        }
    }
}

export {
    GameScreen,
    GameTitleScreen
}