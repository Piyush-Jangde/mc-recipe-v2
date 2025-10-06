const { calculateRawMaterials } = require('./calculator.js');


const calculateBtn = document.getElementById('calculate-btn');
const buildListInput = document.getElementById('build-list-input');
const resultsOutput = document.getElementById('results-output');

calculateBtn.addEventListener('click', () => {
    const inputText = buildListInput.value;
    
    //Parse user's input text into a shopping list object
    const shoppingList = {};
    const lines = inputText.trim().split('\n');
    lines.forEach(line => {
        const parts = line.split(' ');
        if (parts.length >= 2) {
            const item = parts[0];
            const quantity = parseInt(parts[1], 10);
            if (item && !isNaN(quantity)) {
                shoppingList[item] = (shoppingList[item] || 0) + quantity;
            }
        }
    });

    const finalMaterials = calculateRawMaterials(shoppingList);

    //Format and display the results
    let resultText = 'Calculation complete!\n\n';
    if (Object.keys(finalMaterials).length === 0) {
        resultText += 'No raw materials needed.';
    } else {
        for (const material in finalMaterials) {
            resultText += `${material}: ${finalMaterials[material]}\n`;
        }
    }

    resultsOutput.textContent = resultText;
});