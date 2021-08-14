import { basicSprite } from './simpleSprite'

class Element {
    constructor(x,y,width,height,spritePath) {
        this.movingRight = false
        this.sprite = basicSprite(spritePath,x,y,
            width,height);
    }

    update(delta) {
        // Update Sprite
        if(this.movingRight)
            this.sprite.x += 1 * delta
    }

    moveRight(status) { this.movingRight = status }

    getSprite(){ return this.sprite; }
}

export {
    Element
}