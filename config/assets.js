
const foodAssets = [
    // Food
    { name: "apple_pie", url: "../assets/apple_pie.png" },
    { name: "apple_pie_dish", url: "../assets/apple_pie_dish.png" },
    { name: "bacon", url: "../assets/bacon.png" },
    { name: "bacon_dish", url: "../assets/bacon_dish.png" },
    { name: "burger", url: "../assets/burger.png" },
    { name: "burger_dish", url: "../assets/burger_dish.png" },
]

var assets = [
    // Dishes
    { name: "dish", url: "../assets/dish.png" },
    { name: "dish_pile", url: "../assets/dish_pile.png" },
]

assets.push(...foodAssets)

export { assets, foodAssets }