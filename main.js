import * as PIXI from 'pixi.js-legacy';
import setup  from './setup'
import objects from './modules/characters/objects'

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

// Load texture and Assets
const loader = new PIXI.Loader();

let assets = [
      "assets/characters/red_box.jpg"
]

loader
  .add(assets)
  .load(start);


// Start Game
function start() {
      // Load objects
      let red = new objects.Element(gameWidth/2,gameHeight/2,256,256,'assets/characters/red_box.jpg')
}