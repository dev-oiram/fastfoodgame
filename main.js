import { config, gameApp, stage, loader } from './config/config'
import { assets } from './config/assets'
import { Element } from './modules/characters/objects'


// Adds the app canvas to the html <body>
document.body.appendChild(gameApp);

// Load assets and start Game
loader
  .add(assets)
  .load(startGame);


// Start Game
function startGame() {
      let redBox = new Element(config.gameWidth/2,config.gameHeight/2,50,50,"a_redBox")
      stage.addChild(redBox.getSprite())
}
