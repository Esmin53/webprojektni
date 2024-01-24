let originalData = [];
let data = [];
const recipesContainer = document.getElementById('recipes_container');

const getData = async () => {
    try {
        const response = await fetch('backend.php?action=getRecipes')

        if (!response.ok) {
            throw new Error('Network response was not ok');
          }

        originalData = await response.json()
        data = originalData;

    } catch (error) {
        console.log(error)
    }
}

const processData = () => {
    while (recipesContainer.firstChild) {
        recipesContainer.removeChild(recipesContainer.firstChild);
      }

    data.forEach(recipe => {
        // Create the recipe div
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe_container';
    
        // Add recipe image
        const recipeImage = document.createElement('img');
        recipeImage.src = 'https://img.freepik.com/free-vector/restaurant-mural-wallpaper-concept_23-2148671801.jpg?w=1060&t=st=1705875708~exp=1705876308~hmac=dbb7acc9bf2d6311c062bdf1cf869a88846bb0933c447a42fba7903a3e72c0c5';
        recipeImage.alt = 'Recipe image';
        recipeImage.className = 'recipe_image';
        recipeDiv.appendChild(recipeImage);
    
        // Add recipe title and cooking time
        const recipeTop = document.createElement('div');
        recipeTop.className = 'recipe_top';
    
        const recipeTitle = document.createElement('h3');
        recipeTitle.className = 'recipe_title';
        recipeTitle.textContent = recipe.title;
        recipeTop.appendChild(recipeTitle);
    
        const recipeTime = document.createElement('p');
        recipeTime.className = 'recipe_time';
        recipeTime.textContent = convertCookingTime(recipe.cookingTime);
        recipeTop.appendChild(recipeTime);
    
        recipeDiv.appendChild(recipeTop);
    
        // Add recipe instructions
        const recipeInstructions = document.createElement('p');
        recipeInstructions.className = 'recipe_instructions';
        recipeInstructions.textContent = recipe.instructions.substring(0, 100);
        recipeDiv.appendChild(recipeInstructions);
    
        // Add "See recipe" button
        const recipeButton = document.createElement('button');
        recipeButton.className = 'recipe_button';
        recipeButton.textContent = 'See recipe';


        const recipeLink = document.createElement('a');
        recipeLink.className = 'recipe_button';
        recipeLink.textContent = 'See recipe';
        recipeLink.href = `recipe.html?recipeId=${recipe.id}`
        recipeDiv.appendChild(recipeLink);
    
        // Append the recipe div to the container
        recipesContainer.appendChild(recipeDiv);
      });
}

const filterData = () => {
    const search = document.getElementById('search_input')
    const cookingTime = document.getElementById('cookingTime')
    const dificulty = document.getElementById('dificulty')

    data = originalData.filter((item) => item.title.toLowerCase().includes(search.value.toLowerCase()));

    if (cookingTime.value !== 'any') {
        const targetCookingTime = parseInt(cookingTime.value, 10);
    
        data = data.filter((item) => {
            const itemCookingTime = parseInt(item.cookingTime, 10);
            return itemCookingTime <= targetCookingTime;
        });
    }
    if(dificulty.value != 'any' && dificulty.value !== null) {
        console.log(dificulty.value)
        data = data.filter((item) => {
            console.log('Item dificulty: ', item.difficulty, '=', dificulty.value)
            return item.difficulty == dificulty.value});
    }
    
    console.log(data)
    processData()   
}

getData().then(processData).catch(error => console.error('Error:', error));

