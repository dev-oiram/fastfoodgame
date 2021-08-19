import { gameApp, stage, loader } from './config/config'
import { assets } from './config/assets'
import { GameScreen, GameTitleScreen } from './modules/screens'


//SPRITE JSON ANIMATION CREATRION TOOL
// https://www.leshylabs.com/apps/sstool/


// Adds the app canvas to the html <body>
document.body.appendChild(gameApp.view);

// Load assets and start Game
loader
  .add(assets)
  .load(start);


// Start Game
function start() {
    // Creacion de Screens
    let titleScreen = new GameTitleScreen(stage)
    let gameScreen = new GameScreen(stage)
    gameScreen.container.visible = false
    

    gameApp.ticker.add((deltaTime) => {
        // Update Loop
        gameScreen.update(deltaTime)
        titleScreen.update(deltaTime)

        if(titleScreen.gameScreen && titleScreen.active){
          titleScreen.container.visible = false
          titleScreen.active = false
          
          gameScreen.container.visible = true
          gameScreen.init =  true
        }

        if(gameScreen.titleScreen && gameScreen.initActive){
          gameScreen.container.visible = false
          gameScreen.initActive = false

          titleScreen.container.visible = true
          titleScreen.init = true
        }

    });
}
