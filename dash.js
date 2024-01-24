let email;
let recipe = null;

const checkSession = async () => {
  try {
      const response = await fetch('backend.php?action=getSession');

      const session = await response.json();
 
      console.log(session)
      if(!session.data) window.location.href = "homepage.html";

      email = session.data;
  } catch (error) {
      console.log(error)
  }
}

const displayRecipes = (recipes) => {
  const recipesContainer = document.getElementById('recipes_container');
  const recipeCount = document.getElementById('recipe_count');
  recipeCount.textContent = recipes.length;

  recipes.forEach((recipe) => {
    const recipeContainer = document.createElement('div');
    recipeContainer.classList.add('my_recipe_container');

    const recipeHeader = document.createElement('div');
    recipeHeader.id = 'my_recipe_header';

    const recipeTitle = document.createElement('h2');
    recipeTitle.classList.add('my_recipe_title');
    recipeTitle.textContent = recipe.title;

    const recipeInfo = document.createElement('div');
    recipeInfo.classList.add('my_recipe_info');

    const recipeDificulty = document.createElement('p');
    recipeDificulty.classList.add('my_recipe_detail');
    recipeDificulty.textContent = recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1);
    const star = document.createElement('i');
    star.classList.add('bx', 'bx-star', 'my_recipe_detail_icon');
    recipeDificulty.appendChild(star);


    const recipeCookingTime = document.createElement('p');
    recipeCookingTime.classList.add('my_recipe_detail');
    recipeCookingTime.textContent = convertCookingTime(recipe.cookingTime )
    const stopWatch = document.createElement('i');
    stopWatch.classList.add('bx', 'bx-stopwatch', 'my_recipe_detail_icon');
    recipeCookingTime.appendChild(stopWatch);


    const recipeOptions = document.createElement('div');
    recipeOptions.id = 'my_recipe_options';

    const editButton = document.createElement('button');
    editButton.classList.add('my_recipe_button');
    editButton.onclick = () => getRecipe(recipe.id);
    const editButtonIcon = document.createElement('i');
    editButtonIcon.classList.add('bx', 'bx-edit-alt');
    editButton.appendChild(editButtonIcon);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('my_recipe_button');
    deleteButton.onclick = () => deleteRecipe(recipe.id);
    const deleteButtonIcon = document.createElement('i')
    deleteButtonIcon.classList.add('bx', 'bxs-trash')
    deleteButton.appendChild(deleteButtonIcon);

    const seeMoreButton = document.createElement('a');
    seeMoreButton.classList.add('my_recipe_button');
    const seeMoreIcon = document.createElement('i')
    seeMoreIcon.classList.add('bx', 'bx-search')
    seeMoreButton.appendChild(seeMoreIcon);
    seeMoreButton.href = `recipe.html?recipeId=${recipe.id}`

    // Append elements to their respective containers
    recipeInfo.appendChild(recipeDificulty);
    recipeInfo.appendChild(recipeCookingTime);

    recipeOptions.appendChild(editButton);
    recipeOptions.appendChild(deleteButton);
    recipeOptions.appendChild(seeMoreButton);

    recipeHeader.appendChild(recipeTitle);
    recipeHeader.appendChild(recipeInfo);

    recipeContainer.appendChild(recipeHeader);
    recipeContainer.appendChild(recipeOptions);

    recipesContainer.appendChild(recipeContainer);
  });
};

const displayUser = (userInfo) => {
  const userInfoDiv = document.getElementById('user_info')
  
  const firstName = document.createElement('p')
  firstName.textContent = userInfo.first_name
  const lastName = document.createElement('p')
  lastName.textContent = userInfo.last_name
  const email = document.createElement('p')
  email.textContent = userInfo.email

  
  userInfoDiv.appendChild(firstName)
  userInfoDiv.appendChild(lastName)
  userInfoDiv.appendChild(email)

}

const getUser = async () => {
  try {
    const response = await fetch(`backend.php?action=getUser&email=${email}`);

    const data = await response.json();

    displayUser(data[0])

  } catch (error) {
    console.log(error)
  }
}

const getUserRecipes = async () => {
  try {
    const response = await fetch('backend.php?action=getUsersRecipes')

    const data = await response.json()

    displayRecipes(data)
    console.log(data)
    
  } catch (error) {
    console.log(error)
  }
}

checkSession().then(() => {
  getUser();
  getUserRecipes();
})

const changePassword = async (event) => {
  event.preventDefault();
  try {
    const oldPassword = document.getElementById('oldPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmNewPassword = document.getElementById('confirmNewPassword');

 
     if(checkInputLength(oldPassword, 5) ||    checkInputLength(newPassword, 5) || checkInputLength(confirmNewPassword, 5)) {
      showToast('Insuficient length', 'Your password must contain atleast 5 characters');
      return;
     }

     if(newPassword.value != confirmNewPassword.value) {
      showToast('Password mismatch!', 'Please make sure that new password and confirm password match!')
      return
     }

     const requestBody = JSON.stringify({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });

    const response = await fetch("change-password.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })

    if (!response.ok) {
      console.log(response)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json()

    if (data.status === 'success') {
      // Redirect to login.html
      window.location.href = "login.html";
  } else {
      // Handle error case
      console.error(data.message);
  }
  
  } catch (error) {
    console.log(error)
    showToast('Something went wrong', 'There was an error changing your password, please try again later.')
  }
}

const getRecipe = async (recipeId) => {
  try {
      const response = await fetch(`backend.php?action=getRecipe&id=${recipeId}`);

      const data = await response.json()

      const headerTitle = document.getElementById('dashboard_header_title')
      headerTitle.textContent = data.recipeData.title;
      const title = document.getElementById('title')
      title.value = data.recipeData.title;
      const instructions = document.getElementById('instructions')
      instructions.value = data.recipeData.instructions;
      const cookingTime = document.getElementById('cookingTime')
      cookingTime.value = data.recipeData.cookingTime;
      const difficulty = document.getElementById('dificulty')
      difficulty.value = data.recipeData.difficulty;

      recipe = data;
  } catch (error) {
      console.log(error)
  }
}

const editRecipe = async (event) => {
  try {
    event.preventDefault();

    if(!recipe) {
      showToast('Something went wrong', 'Please choose a recipe to be edited before continuing!')
      return
    }

    const title = document.getElementById('title')
    const instructions = document.getElementById('instructions')
    const cookingTime = document.getElementById('cookingTime')
    const difficulty = document.getElementById('dificulty')

    console.log(title.value, instructions.value, cookingTime.value, difficulty.value)
    if(checkInputValues(title, recipe.recipeData.title) && checkInputValues(instructions, recipe.recipeData.instructions)
      && checkInputValues(cookingTime, recipe.recipeData.cookingTime) && checkInputValues(difficulty, recipe.recipeData.difficulty)) {
        showToast('Invalid request', 'Please make some changes first!')
      }

    if(checkInputLength(title, 2) || checkInputLength(instructions, 2)) {
      showToast('Insuficient length', 'Your title or instructions can not be shorter than 2 characters');
      return;
     }

     const requestBody = JSON.stringify({
      title: title.value,
      instructions: instructions.value,
      cookingTime: cookingTime.value,
      difficulty: difficulty.value
    });

    const response = await fetch("change-recipe.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })

    if (!response.ok) {
      console.log(response)
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json()

    console.log(data)

  } catch (error) {
    console.log(error)
  }
}

const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`backend.php?action=deleteRecipe&id=${id}`)

    const data = await response.json();

    console.log(data)
    if(data.status === 'success') {
      console.log('Success')
      window.location.reload()
    }

  } catch (error) {
    console.log(error)
  }
}