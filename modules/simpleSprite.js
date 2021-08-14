import { Sprite } from 'pixi.js';

//basicSprite(TexturePath,x,y,width,height)
function basicSprite(texturePath,x,y,wi,he) {
	var sprt;
	sprt = Sprite.from(texturePath);
  	sprt.width = wi;
  	sprt.height = he;
  	sprt.x = x;
  	sprt.y = y;
  	sprt.anchor.set(0.5);
  	return sprt;
}

export {
    basicSprite
}