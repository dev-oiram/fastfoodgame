import { basicSprite } from './simpleSprite'

class Element {
    constructor(x,y,width,height,spritePath) {
        this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.spritePath = spritePath;
        this.setSprite();
    }

    setSprite(){
		this.sprite = basicSprite(this.spritePath,this.x,this.y,
            this.width,this.height);
	}

    getSprite(){ return this.sprite; }
}

export {
    Element
}