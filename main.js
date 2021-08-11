import * as PIXI from 'pixi.js-legacy';
import setup  from './setup'

//Define gameWidth and gameHeight
const gameWidth = 800, 
      gameHeight = 600,
      color = 0x1099bb

//Garbage mode auto-activate
PIXI.settings.GC_MODE = PIXI.GC_MODES.AUTO;

//Set Pixi Application
var app = setup.setApp(gameWidth, gameHeight, color)

//Adds the app canvas to the html <body>
document.body.appendChild(app.view);