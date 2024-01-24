


let ingredients = []

const addIngredient = () => {
    let ingredient = document.getElementById('ingredients')
    let amount = document.getElementById('amount')

    if(checkInputLength(ingredient, 1)) {
        ingredient.classList.add("input_error");
        showToast("Something went wrong!", "Please provide ingredient name and ammount")
        return
    } else {
        ingredient.classList.remove("input_error");
    }

    if(checkInputLength(amount, 1)) {
        amount.classList.add("input_error");
        showToast("Something went wrong!", "Please provide ingredient name and ammount")
        return
    } else {
        amount.classList.remove("input_error");
    }


    ingredients = [...ingredients, {
        ingredient_name: ingredient.value,
        amount: amount.value
    }]

    const displayIngredints = document.getElementById("add_recipe_display_ingredients");

    // Create a new div element for each ingredient and amount
    const ingredientContainer = document.createElement('div');
    ingredientContainer.className = "ingredient_container";

    const ingredientElement = document.createElement('p');
    ingredientElement.className = "display_ingredient";
    ingredientElement.textContent = `${ingredient.value},`;

    const dotsElement = document.createElement('span');
    dotsElement.className = "display_ingredient_dots";

    const amountElement = document.createElement('p');
    amountElement.className = "display_amount";
    amountElement.textContent = amount.value;

    // Append the new elements to the ingredientContainer
    ingredientContainer.appendChild(ingredientElement);
    ingredientContainer.appendChild(dotsElement);
    ingredientContainer.appendChild(amountElement);

    // Append the ingredientContainer to the displayIngredints container
    displayIngredints.appendChild(ingredientContainer);

    ingredient.value = "";
    amount.value = "";
}

const addRecipe = async () => {
    try {
        const title = document.getElementById('title');
        const cookingTime = document.getElementById('cookingTime');
        const dificulty = document.getElementById('dificulty');
        const instructions = document.getElementById('instructions');

    
        if(checkInputLength(title, 2)) {
            title.classList.add("input_error");
            showToast("Something went wrong!", "Title must be at least 2 characters long!")
            return
        } 
        if(cookingTime.value === null) {
            cookingTime.classList.add("input_error");
            
            showToast("Something went wrong!", "Cooking time input can not stay empty")
            return
        } else {
            cookingTime.classList.remove("input_error");
        }
        if(ingredients.length < 1) {
            console.log("Ingredients is empty")
            showToast("Something went wrong!", "You must provide atleast 2 ingredients!")
            return
        }
        if(checkInputLength(instructions, 2)) {
            instructions.classList.add("input_error");
            showToast("Something went wrong!", "Instructions must be atleast 2 characters long")
            return
        }
        
        
        const requestBody = JSON.stringify({
            title: title.value,
            cookingTime: cookingTime.value,
            ingredients,
            instructions: instructions.value,
            dificulty: dificulty.value
        });

        const response = await fetch('add-recipe.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: requestBody
        })        

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json()

        console.log(data)
    } catch (error) {
        showToast("Something went wrong!", "There was an error uploading your recipe, please try again later!")
        throw new Error(error);
    }

};
