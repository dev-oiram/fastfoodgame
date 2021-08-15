import { TilingSprite } from 'pixi.js';
import { basicSprite } from './simpleSprite'

// Private Class
class ObjectFood {
    constructor(x,y,width,height,spritePath) {
        this.count = 0
        this.movingRight = false
        this.sprite = basicSprite(spritePath,x,y,
            width,height);
    }

    update(delta) {
        // Update Sprite
        this.idle(delta)
    }

    idle(delta) {
        this.sprite.width +=  (Math.sin(this.count) * 0.3) * delta;
        this.sprite.height +=  (Math.cos(this.count) * 1) * delta;
        this.count += 0.1;
    }

    getSprite(){ return this.sprite; }
}


// ========================= Public Classes =====================================


// Food Class Object
class Food extends ObjectFood {
    constructor(x,y,width,height,spritePath) {
        super(x,y,width,height,spritePath)
        this.velocity = 0
        this.moveDown = false
        this.lastY = y
        this.distance = 300
    }

    down() {
        this.moveDown = true
    }

    update(delta) {
        super.update(delta)
        if(this.moveDown){
            this.sprite.y += (this.velocity * delta)

            if(this.sprite.y >= ((this.lastY + this.distance)/2)){
                this.velocity -= 1
            }else{
                this.velocity += 0.5
            }

        }
    }
}

export {
    Food
}