import { sound } from '@pixi/sound';

const foodAssets = [
    // Food
    // { name: "bacon", url: "../assets/bacon.png" },
    // { name: "bacon_dish", url: "../assets/bacon_dish.png" },
    { name: "burger", url: "../assets/burger.png" },
    { name: "burger_dish", url: "../assets/burger_dish.png" },
    // { name: "bread", url: "../assets/bread.png" },
    // { name: "bread_dish", url: "../assets/bread_dish.png" },
    // { name: "burrito", url: "../assets/burrito.png" },
    // { name: "burrito_dish", url: "../assets/burrito_dish.png" },
    { name: "frenchfries", url: "../assets/frenchfries.png" },
    { name: "frenchfries_dish", url: "../assets/frenchfries_dish.png" },
    { name: "friedegg", url: "../assets/friedegg.png" },
    { name: "friedegg_dish", url: "../assets/friedegg_dish.png" },
    // { name: "giantgummybear", url: "../assets/giantgummybear.png" },
    // { name: "giantgummybear_dish", url: "../assets/giantgummybear_dish.png" },
    // { name: "macncheese", url: "../assets/macncheese.png" },
    // { name: "macncheese_dish", url: "../assets/macncheese_dish.png" },
    // { name: "omlet", url: "../assets/omlet.png" },
    // { name: "omlet_dish", url: "../assets/omlet_dish.png" },

    // { name: "pudding", url: "../assets/pudding.png" },
    // { name: "pudding_dish", url: "../assets/pudding_dish.png" },
    // { name: "pizza", url: "../assets/pizza.png" },
    // { name: "pizza_dish", url: "../assets/pizza_dish.png" },
    // { name: "steak", url: "../assets/steak.png" },
    // { name: "steak_dish", url: "../assets/steak_dish.png" },
]

var assets = [
    // Animations
    { name: "idle_wiz", url: "../assets/idle_wiz.json" },
    { name: "victory_dance", url: "../assets/victory_dance.json" },
    // Additional Assets
    { name: "background", url: "../assets/background.png" },
    { name: "backgroundTitle", url: "../assets/title_instructions.png" },
    { name: "prestartScreen", url: "../assets/prestartScreen.png" },
    { name: "scoreScreen", url: "../assets/scoreScreen.png" },
    { name: "winnerScreen", url: "../assets/winnerScreen.png" },
    { name: "creditsScreen", url: "../assets/creditsScreen.png" },
    { name: "stopwatch", url: "../assets/stopwatch.png" },
    { name: "btn_start", url: "../assets/btn_start.png" },
    { name: "btn_ok", url: "../assets/btn_ok.png" },
    { name: "btn_credits", url: "../assets/btn_credits.png" },
    // Dishes
    { name: "dish", url: "../assets/dish.png" },
    { name: "dish2", url: "../assets/dish2.png" },
    { name: "dish_pile", url: "../assets/dish_pile.png" },
    // Sound & Music
    { name: "gameMusic", url: "../assets/sounds/GameOn.mp3" },
    { name: "titleScreen", url: "../assets/sounds/titleScreen.mp3" },
    { name: "victory", url: "../assets/sounds/victory.mp3" },
    { name: "move", url: "../assets/sounds/move.wav" },
    { name: "correct", url: "../assets/sounds/correct.wav" },
    { name: "wrong", url: "../assets/sounds/wrong.wav" },
]

assets.push(...foodAssets)


// Load Sounds & Music
sound.add('musicStart', '../assets/sounds/GameOn.mp3');
sound.add('titleMusic', '../assets/sounds/titleScreen.mp3');
sound.add('victoryMusic', '../assets/sounds/victory.mp3');
sound.add('moveSound', '../assets/sounds/move.wav');
sound.add('correctSound', '../assets/sounds/correct.wav');
sound.add('wrongSound', '../assets/sounds/wrong.wav');

export { assets, foodAssets, sound }