let recipe

const getData = async () => {
    try {
        const recipeId = window.location.href.split('=')[1];
        const response = await fetch(`backend.php?action=getRecipe&id=${recipeId}`);

        const data = await response.json()

        console.log(data)

        recipe = data;
    } catch (error) {
        console.log(error)
    }
}

getData().then(() => {
    const recipeTitle = document.getElementById('recipe_title');
    recipeTitle.textContent = recipe.recipeData.title;

    const recipeInfo = document.getElementById('recipe_info');
    recipeInfo.textContent = recipe.recipeData.difficulty + ' - ' + recipe.recipeData.cookingTime + ' minutes or less'

    const recipeIngredients = document.getElementById('recipe_ingredients')

    recipe.ingredients.forEach((item) => {
        const paragraph = document.createElement('p')
        paragraph.textContent = item.ingredient_name + ' ' + item.amount + ',';

        console.log(item)
        recipeIngredients.appendChild(paragraph)
    })

    const recipeInstructions = document.getElementById('recipe_instructions');
    recipeInstructions.textContent = 'Instructions: ' +recipe.recipeData.instructions;
})
