const { calculateRawMaterial} = require('./calculator.js')
const recipes = require('./recipes.json');
const rawMaterials=require('./raw_materials.json');

const calculateBtn=document.getElementById('calculate-btn');
const buildListInput=document.getElementById('build-list-input');
const resultsOutput=document.getElementById('results-output');

calculateBtn.addEventListener('click', ()=>{
    const inputText = buildListInput.value;

    //Parse the user input into shopping list object
    const shoppingList = {};
    const lines = inputText.trim().split('\n');
    lines.forEach(line=> {
        const parts=line.split(' ');
        if(parts.length >=2){
            const item = parts[0];
            const quantity = parseInt(parts[1], 10);
            if(item && !isNaN(quantity)) {
                shoppingList[item] = (shoppingList[item] || 0) + quantity;
            }
        }
    });

    //Calculate the required ingredients
    const finalMaterials= calculateRawMaterial(shoppingList, recipes, rawMaterials);

    //Format and Display the result
    let resultText= 'Calculation complete!\n\n';
    if(Object.keys(finalMaterials).length===0) {
        resultText+= 'Nothing to Craft or all items are raw materials.';
    } else {
        for(const material in finalMaterials)
        {
            resultText +=`${material}: ${finalMaterials[material]}\n`;
        }
    }

    resultsOutput.textContent=resultText;
});