import { Container } from 'pixi.js-legacy'
import { basicSprite, basicText } from './simpleSprite'

// Private Classes

const optionsSize = 50

const FoodDish = [
    { name:'burger', x:0, y: 0, reel:1 },
    { name:'frenchfries', x:0, y: 0, reel:2 },
    { name:'friedegg', x:0, y: 0, reel:3 }
]

// Static Object
class StaticObject {
    constructor(x,y,width,height,spritePath) {
        this.sprite = basicSprite(spritePath,x,y,width,height)
    }

    getSprite(){ return this.sprite; }
}

// Game Objects with idle
class ObjectGame {
    constructor(x,y,width,height,spritePath) {
        this.count = 0
        this.movingRight = false
        this.sprite = basicSprite(spritePath,x,y,width,height)
    }

    // Update Sprite
    update(delta) {
        this.idle(delta)
    }

    // Basic Object Idle
    idle(delta) {
        this.sprite.width +=  (Math.sin(this.count) * 0.3) * delta
        this.sprite.height +=  (Math.cos(this.count) * 1) * delta
        this.count += 0.1
    }

    getSprite(){ return this.sprite; }
}

// Text Object
class TextObject {
    constructor(x,y,data) {
        this.text = basicText(data)
        this.text.x = x
        this.text.y = y
    }

    setText(data) {
        this.text.text = data
    }

    getText() {
        return this.text
    }
}


// ========================= Public Classes =====================================

class GameBackground extends StaticObject {
    constructor(x,y,width,height,spritePath) {
        super(x,y,width,height,spritePath)
    }
}

// TimeText
class TimeText extends TextObject {
    constructor(x,y,start) {
        super(x,y,start)
        this.timeOut = false
        this.limit = start

        setInterval(() =>{
            this.limit -= 1
        }, 1000)
    }

    updateTime(){
        if(!this.timeOut){
            if(this.limit >= 0 && !this.timeOut) {
                this.setText(this.limit)
            }else {
                this.timeOut = true
            }
        }
    }

    getTimeOut() { return this.timeOut }


    update(delta) {
        this.updateTime()
    }
}

// Shwon Object
class ShownObject extends ObjectGame {
    constructor(x,y,width,height,spritePath) {
        super(x,y,width,height,spritePath)
        this.rotRight = true
    }

    // Basic Object Idle
    idle(delta) {
        this.sprite.width +=  (Math.sin(this.count) * 0.3) * delta
        this.sprite.height +=  (Math.cos(this.count) * 1) * delta
        this.count += 0.6

        if(this.sprite.rotation > 0.4 && this.rotRight)
            this.rotRight = false

        if(this.sprite.rotation < -0.4 && !this.rotRight)
            this.rotRight = true


        if(this.rotRight)
            this.sprite.rotation += 0.05
        else
            this.sprite.rotation -= 0.05
    }
    
}

// Dish class Object
class Dish extends ObjectGame {
    constructor(x,y,width,height,spritePath) {
        super(x,y,width,height,spritePath)
    }
}

class OneDish extends StaticObject {
    constructor(x,y,width,height,spritePath,dish) {
        super(x,y,width,height,spritePath)
        this.content = new Container()

        this.setup(x,y,dish)
    }

    setup(x,y,dish) {
        this.content.addChild(this.sprite)
        let sprt = basicSprite(FoodDish[dish].name,x+FoodDish[dish].x,y+FoodDish[dish].y,optionsSize,optionsSize)
        this.content.addChild(sprt)
        //this.dishContent = FoodDish[dish]
        //this.sprite = basicSprite(spritePath,x,y,width,height)
        // this.dishContent.forEach(el => {
        //     let sprt = basicSprite(el.name,x+el.x,y+el.y,optionsSize,optionsSize)
        //     this.content.addChild(sprt)
        // });
    }

    getSprite() {
        return this.content
    }

    update(delta) {}
}


// Food class Object
class Food extends ObjectGame {
    constructor(x,y,width,height,spritePath,spritePathDish) {
        super(x,y,width,height,spritePath)

        this.name = spritePath
        
        // Move variables
        this.velocity = 0
        this.speed = 8
        this.acceleration = 1

        // States
        this.moving = false
        this.moveDown = false
        this.moveUp = false
        this.moveRight = false
        this.validating = false
        
        // variables
        this.active = false
        this.valid = false
        this.lastY = y
        this.lastX = x
        this.reel = 1
        this.distance = 120

        // additional Sprites
        this.spriteDish = basicSprite(spritePathDish,x,y,
            width,height)
        this.spriteDish.visible = false
    }

    // Move DOWN
    down() {
        if(!this.moving && this.reel < 3 && this.active){
            this.moveDown = true
            this.moving = true
        }
    }

    // Move UP
    up() {
        if(!this.moving && this.reel > 1 && this.active){
            this.moveUp = true
            this.moving = true
        }
    }

    // Move RIGHT
    right() {
        if(!this.moving && this.active){
            this.moveRight = true
            this.moving = true
        }
    }

    left() {
        //this.movingLeft = true
        this.sprite.x -= 55
    }

    // Override idel method
    idle(delta) {
        super.idle(delta)
        this.spriteDish.width +=  (Math.sin(this.count) * 0.3) * delta
        this.spriteDish.height +=  (Math.cos(this.count) * 1) * delta
    }

    // Metod to change active status
    setActive(status) {
        this.sprite.x = 100
        this.sprite.y = 150
        this.lastX = 100
        this.lastY = 150
        this.active = status
    }

    getActive() {
        return this.active
    }

    update(delta) {
        super.update(delta)
        // Update additional Sprites
        this.spriteDish.x = this.sprite.x
        this.spriteDish.y = this.sprite.y

        // Moving Down Sprite
        if(this.moveDown){
            if(this.sprite.y >= this.lastY + (this.distance/2)){
                if(this.sprite.y >= this.lastY + this.distance){
                    //console.log("Position: "+this.sprite.y)
                    this.lastY = this.sprite.y
                    this.moveDown = false
                    this.moving = false
                    this.reel ++
                    this.velocity = 0
                }else{
                    this.velocity -= this.acceleration * delta;
                    this.sprite.y += this.speed * this.velocity * delta;
                }
            }else{
                this.velocity += this.acceleration * delta;
                this.sprite.y += this.speed * this.velocity * delta;
            }
        }

        // Moving Up Sprite
        if(this.moveUp){
            if(this.sprite.y <= this.lastY - (this.distance/2)){
                if(this.sprite.y <= this.lastY - this.distance){
                    //console.log("Position: "+this.sprite.y)
                    this.lastY = this.sprite.y
                    this.moveUp = false
                    this.moving = false
                    this.reel --
                    this.velocity = 0
                }else{
                    this.velocity -= this.acceleration * delta;
                    this.sprite.y -= this.speed * this.velocity * delta;
                }
            }else{
                this.velocity += this.acceleration * delta;
                this.sprite.y -= this.speed * this.velocity * delta;
            }
        }

        // Moving Right Sprite
        if(this.moveRight) {
            if(this.validarReel()) {
                if(this.sprite.x >= this.lastX + (450/2)){
                    if(this.sprite.x >= this.lastX + this.distance){
                        //console.log("Position: "+this.sprite.y)
                        this.spriteDish.visible = true
                        this.sprite.visible = false
                        this.lastX = this.spriteDish.x
                        this.moveRight = false
                        this.velocity = 0
                        this.validate()

                    }else{
                        this.velocity -= this.acceleration * delta;
                        this.sprite.x += this.speed * this.velocity * delta;
                    }
                }else{
                    this.velocity += this.acceleration * delta;
                    this.sprite.x += this.speed * this.velocity * delta;
                }
            }
        }

        // Validating Sprite state
        if(this.validating) {
            this.sprite.x += 1 * delta
        }
    }

    validarReel() {
        let reel = FoodDish.find(el => el.reel == this.reel);
        if(reel.name == this.name){
            this.valid = true
            return true
        }
        else{
            this.valid = false
            return false
        }
    }

    // Set Sprite validation
    validate() {
        this.validating = true
    }

    getSpriteDish() { return this.spriteDish }
}

export {
    GameBackground,
    ShownObject,
    Food,
    Dish,
    OneDish,
    TimeText
}