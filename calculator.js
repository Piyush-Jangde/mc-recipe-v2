function calculateRawMaterial(shoppingList, recipes, rawMaterials) {
    let needed = {...shoppingList}; //Copy of items needed
    let raw={} //To store the final raw materials

    while(Object.keys(needed).length > 0) {
        const currentItem = Object.keys(needed)[0];
        const quantityNeeded = needed[currentItem];
        delete needed[currentItem]; //Remove the current item from the todo list

        //Raw Material
        if(rawMaterials.includes(currentItem)) {
            raw[currentItem]= (raw[currentItem] || 0 ) + quantityNeeded;
            continue;
        }
        //Crafted Material
        const recipe = recipes[currentItem];
        if(!recipe) { //For materials which do not have a valid recipe
            console.warn(`No recipe found for: ${currentItem} `);
            continue;
        }

        //Conversion Factor from current material to -1 lvl material
        const runs=Math.ceil(quantityNeeded/recipe.output);

        //Adding the simpler material to ingredients list
        for (const ingredient in recipe.ingredients) {
            const quantityRequired = runs * recipe.ingredients[ingredient];
            needed[ingredient] = (needed[ingredient] || 0 ) + quantityRequired;
        }

    }
    return raw;
}

module.exports = {calculateRawMaterial};