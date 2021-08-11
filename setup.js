import * as PIXI from 'pixi.js';

var setApp = (gameWidth, gameHeight, color) => {
    var app = new PIXI.Application(gameWidth, gameHeight);
    app.renderer.backgroundColor = color;
    app.autoResize = true;

    //Aling canvas to the center
    app.view.style.display = "block";
    app.view.style.margin = "0 auto";

    return app
}

export default {
    setApp
}