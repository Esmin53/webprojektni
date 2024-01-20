const addRecipe = async () => {
    try {
        const title = document.getElementById('title').value;
        const cookingTime = document.getElementById('cookingTime').value;
        const ingredients = document.getElementById('ingredients').value;
        const instructions = document.getElementById('instructions').value;
    
        const requestBody = JSON.stringify({
            title,
            cookingTime,
            ingredients,
            instructions
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
        console.log(error)
    }

};