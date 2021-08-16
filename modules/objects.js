import { basicSprite } from './simpleSprite'

// Private Class
class ObjectGame {
    constructor(x,y,width,height,spritePath) {
        this.count = 0
        this.movingRight = false
        this.sprite = basicSprite(spritePath,x,y,
            width,height)
    }

    update(delta) {
        // Update Sprite
        this.idle(delta)
    }

    idle(delta) {
        this.sprite.width +=  (Math.sin(this.count) * 0.3) * delta
        this.sprite.height +=  (Math.cos(this.count) * 1) * delta
        this.count += 0.1
    }

    getSprite(){ return this.sprite; }
}


// ========================= Public Classes =====================================

class Dish extends ObjectGame {
    constructor(x,y,width,height,spritePath) {
        super(x,y,width,height,spritePath)
    }
}


// Food Class Object
class Food extends ObjectGame {
    constructor(x,y,width,height,spritePath,spritePathDish) {
        super(x,y,width,height,spritePath)
        this.velocity = 0
        this.speed = 8
        this.acceleration = 1

        // States
        this.moving = false
        this.moveDown = false
        this.moveUp = false
        this.moveRight = false
        this.validating = false
        
        this.valid = false
        this.lastY = y
        this.lastX = x
        this.reel = 1
        this.distance = 120

        this.spriteDish = basicSprite(spritePathDish,x,y,
            width,height)
        this.spriteDish.visible = false
    }

    down() {
        if(!this.moving && this.reel < 4){
            this.moveDown = true
            this.moving = true
        }
    }

    up() {
        if(!this.moving && this.reel > 1){
            this.moveUp = true
            this.moving = true
        }
    }

    right() {
        if(!this.moving){
            this.moveRight = true
            this.moving = true
        }
    }

    update(delta) {
        super.update(delta)
        // Update Sprites
        this.spriteDish.x = this.sprite.x
        this.spriteDish.y = this.sprite.y

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

        if(this.moveRight) {
            if(this.sprite.x >= this.lastX + (450/2)){
                if(this.sprite.x >= this.lastX + this.distance){
                    //console.log("Position: "+this.sprite.x)
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

        if(this.validating) {
            this.sprite.x += 1 * delta
        }
    }

    validate() {
        this.valid = true
        this.validating = true
    }

    getSpriteDish() { return this.spriteDish }
}

export {
    Food,
    Dish
}