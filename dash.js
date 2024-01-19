// Sample recipe data
var recipes = (typeof localStorage["recipeBook"] !== "undefined") ? JSON.parse(localStorage["recipeBook"]) : [];

function update() {
  localStorage.setItem("recipeBook", JSON.stringify(recipes));
  var container = document.getElementById("container");
  container.innerHTML = ""; // Clear previous content

  for (var i = 0; i < recipes.length; i++) {
    var panel = document.createElement("div");
    panel.className = "panel";

    var titleHeader = document.createElement("h4");
    titleHeader.className = "text-center";
    titleHeader.textContent = "Ingredients";
    
    var hr = document.createElement("hr");
    
    var ul = document.createElement("ul");
    ul.innerHTML = recipes[i].ingredients.map(function (ingredient) {
      return "<li>" + ingredient + "</li>";
    }).join("");

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", createDeleteHandler(i));
    
    var editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", createEditHandler(i));

    var buttonToolbar = document.createElement("div");
    buttonToolbar.className = "button-toolbar";
    buttonToolbar.appendChild(deleteBtn);
    buttonToolbar.appendChild(editBtn);

    panel.appendChild(titleHeader);
    panel.appendChild(hr);
    panel.appendChild(ul);
    panel.appendChild(buttonToolbar);
    container.appendChild(panel);
  }
}

function createDeleteHandler(index) {
  return function () {
    recipes.splice(index, 1);
    update();
  };
}

function createEditHandler(index) {
  return function () {
    var recipe = recipes[index];
    var title = prompt("Edit Recipe Title", recipe.title);
    var ingredients = prompt("Edit Recipe Ingredients (separated by commas)", recipe.ingredients.join(",")).split(",");
    
    if (title && ingredients) {
      recipes[index] = { title: title, ingredients: ingredients };
      update();
    }
  };
}

// Initial update
recipes.push({ title: "Pumpkin Pie", ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"] });
recipes.push({ title: "Spaghetti", ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"] });
recipes.push({ title: "Onion Pie", ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"] });
update();
