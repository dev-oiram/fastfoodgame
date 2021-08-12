import * as PIXI from 'pixi.js';

//Spriter(TexturePath,x,y,width,height)
var basicSprite = (texturePath,x,y,wi,he) => {
	var sprt;
	sprt = new PIXI.Sprite(
    PIXI.loader.resources[texturePath].texture
  	);
  	sprt.width = wi;
  	sprt.height = he;
  	sprt.x = x;
  	sprt.y = y;
  	sprt.anchor.set(0.5);
  	return sprt;
}

export default {
    basicSprite
}