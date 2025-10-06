const { db } = require('./database.js');

function calculateRawMaterials(shoppingList) {
    // Prepare SQL statements once for efficiency
    const getRawMaterialStmt = db.prepare('SELECT name FROM raw_materials WHERE name = ?');
    const getRecipeStmt = db.prepare('SELECT id, output_quantity FROM recipes WHERE output_item = ?');
    const getIngredientsStmt = db.prepare('SELECT item_name, quantity FROM ingredients WHERE recipe_id = ?');

    let needed = { ...shoppingList };
    let raw = {};

    while (Object.keys(needed).length > 0) {
        const currentItem = Object.keys(needed)[0];
        const quantityNeeded = needed[currentItem];
        delete needed[currentItem];

        // Check if the item is a raw material
        if (getRawMaterialStmt.get(currentItem)) {
            raw[currentItem] = (raw[currentItem] || 0) + quantityNeeded;
            continue;
        }

        // Get the recipe from the database
        const recipeInfo = getRecipeStmt.get(currentItem);
        if (!recipeInfo) {
            console.warn(`No recipe found for: ${currentItem}`);
            continue;
        }

        const runs = Math.ceil(quantityNeeded / recipeInfo.output_quantity);
        
        // Get the ingredients for that recipe
        const ingredients = getIngredientsStmt.all(recipeInfo.id);
        for (const ingredient of ingredients) {
            const ingredientName = ingredient.item_name;
            const ingredientQuantity = runs * ingredient.quantity;
            needed[ingredientName] = (needed[ingredientName] || 0) + ingredientQuantity;
        }
    }
    
    return raw;
}

module.exports = { calculateRawMaterials };