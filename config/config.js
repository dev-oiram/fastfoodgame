import { settings, GC_MODES, Application, Loader, Ticker } from 'pixi.js-legacy';

// Game config object
const config = {
    gameWidth: 800,
    gameHeight: 600,
    color: 0x1099bb
}

// Garbage mode auto-activate
settings.GC_MODE = GC_MODES.AUTO

//Set Pixi Application
var app = new Application(config.gameWidth, config.gameHeight);
app.renderer.backgroundColor = config.color;
app.autoResize = true;

var gameApp = app

// Aling canvas to the center
gameApp.view.style.display = "block";
gameApp.view.style.margin = "0 auto";

// Define the stage
var stage = app.stage

// Define assets loader
var loader = new Loader()

// Define ticker
var ticker = new Ticker()

export { config, gameApp, stage, loader, ticker }