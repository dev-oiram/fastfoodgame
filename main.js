import { gameApp, stage, loader } from './config/config'
import { assets } from './config/assets'
import { GameScreen } from './modules/screens'


// Adds the app canvas to the html <body>
document.body.appendChild(gameApp.view);

// Load assets and start Game
loader
  .add(assets)
  .load(start);


// Start Game
function start() {
    // Creacion de Screens
    let gameScreen = new GameScreen(stage)

    gameApp.ticker.add((deltaTime) => {
        // Update Loop
        gameScreen.update(deltaTime)
    });
}
