const checkSession = async () => {
    try {
        const response = await fetch('backend.php?action=getSession')

        const session = await response.json()
   
        console.log(session)
        if(!session.data) window.location.href = "homepage.html"
    } catch (error) {
        console.log(error)
    }
}

checkSession()

let ingredients = []
let toast = document.getElementById('toast')

const showToast = (htext, btext) => {
    toast.classList.remove('hide')
    toast.classList.add('show')

    const header = document.getElementById('toast_header')

    const headerText = document.getElementById('toast_header_text')
    headerText.textContent = htext
    
    const bodyText = document.getElementById('toast_body_text')
    bodyText.textContent = btext



}

const hideToast = () => {
    toast.classList.remove('show')
    toast.classList.add('hide')
}

const addIngredient = () => {
    let ingredient = document.getElementById('ingredients')
    let amount = document.getElementById('amount')

    if(ingredient.value.length === 0) {
        ingredient.classList.add("input_error");
        showToast("Something went wrong!", "Please provide ingredient name and ammount")
        return
    } else {
        ingredient.classList.remove("input_error");
    }

    if(amount.value.length === 0) {
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

        console.log(dificulty)
    
        if(title.value.length === 0) {
            title.classList.add("input_error");
            showToast("Something went wrong!", "Title input can not stay empty")
            return
        } else {
            title.classList.remove("input_error");
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
        if(instructions.value.length === 0) {
            instructions.classList.add("input_error");
            showToast("Something went wrong!", "Instructions input can not stay empty")
            return
        } else {
            instructions.classList.remove("input_error");
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

const handleLogout = async () => {
    try {
        
        const response = await fetch('backend.php?action=logOut')

        const data = await response.json()

        console.log(data)

        //window.location.href = '/homepage.html'
    } catch (error) {
        showToast('Something went wrong!', 'There was an error signing you out. Please try again later')
    }
}
