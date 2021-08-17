import { Sprite, Text } from 'pixi.js-legacy';

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

function basicText(text) {
	var txt;
	txt =  new Text(text);
	return txt
}


export {
    basicSprite,
	basicText
}