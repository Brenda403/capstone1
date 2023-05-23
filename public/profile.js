// base url here
const baseURL = `http://localhost:4000`;

// PROFILE HTML CODE

// recipe card form button
const recipeBtn = document.getElementById("recipe-submit-btn");
// display all recipes button & container
const displayBtn = document.getElementById("display-btn");
const recipeContainer = document.getElementById("recipe-container");

// recipe card input
const recipeName = document.getElementById("recipe-name");
const ingredients = document.getElementById("ingredients");
const instructions = document.getElementById("instructions");
const recipeImage = document.getElementById("img-url");
const recipeNotes = document.getElementById("recipe-notes");

// 2nd Main Feature create a recipe

// CREATE RECIPE
const createRecipe = (e) => {
  e.preventDefault();
  let userId = sessionStorage.getItem("userid");
  console.log("hello");
  console.log(userId);
  console.log(sessionStorage);
  let body = {
    recipe: recipeName.value,
    ingredients: ingredients.value,
    instructions: instructions.value,
    recipeImage: recipeImage.value,
    recipeNotes: recipeNotes.value,
    userId: userId,
  };

  axios
    .post(`${baseURL}/api/createRecipe`, body)
    .then(async (res) => {
      //let recipe = await res.data.recipe;
      console.log(res.data);
      // clear the input fields after successful creation
      recipeName.value = "";
      ingredients.value = "";
      instructions.value = "";
      recipeImage.value = "";
      recipeNotes.value = "";
      // Store the userId in sessionStorage
      sessionStorage.setItem("userId", res.data.userId);
    })
    .catch((error) => {
      console.error(error);
    });
};

const createCard = (recipe) => {
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  // content and attributes of the card based on recipes data
  card.innerHTML = `
          <h3>${recipe.recipename}</h3>
          <p class="text-capped">${recipe.ingredients}</p>
          <p class="text-capped">${recipe.instructions}</p>
          <img src="${recipe.imgurl}" alt="${recipe.recipename}">
          <p class="text-capped">${recipe.summary}</p>
          <button class="deleteBtn" onclick="deleteRecipe(${recipe.recipeid})">Delete</button>
          <button class="updateBtn" onclick="updateRecipe(${recipe.recipeid})">Update</button>
        `;

  return card;
};

// Recipe Card text capping and expanding
const toggleTextExpansion = (element) => {
  element.classList.toggle("text-expanded");
};

document.addEventListener("click", (event) => {
  const targetElement = event.target;

  if (targetElement.matches(".text-capped")) {
    toggleTextExpansion(targetElement);
  }
});

// 3rd main feature

// DISPLAY RECIPES
function displayRecipes() {
  axios
    .get(`${baseURL}/api/displayRecipes?userid=userid`, {
      //userId: sessionStorage.getItem("userid"),
    })
    .then((res) => {
      console.log(res.data);
      res.data.forEach((recipe) => {
        // Create a card element for each recipe
        let card = createCard(recipe);
        recipeContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// 4th Main Feature delete recipes

const deleteRecipe = (recipeid) => {
  let userid = sessionStorage.getItem("userid");
  console.log(recipeid);
  axios
    .delete(`${baseURL}/api/deleteRecipe/${recipeid}/${userid}`)
    .then((res) => {
      console.log(res.data);
      while (recipeContainer.firstChild) {
        recipeContainer.removeChild(recipeContainer.firstChild);
      }
      res.data.forEach((recipe) => {
        // Create a card element for each recipe
        let card = createCard(recipe);
        recipeContainer.appendChild(card);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// 5th Main Feature update recipes
const updateRecipe = (recipeid) => {
  let userid = sessionStorage.getItem("userid");
  //user prompts

  const updatedRecipeName = prompt("Enter the updated recipe name:");
  const updatedIngredients = prompt("Enter the updated ingredients:");
  const updatedInstructions = prompt("Enter the updated instructions:");
  const updatedImage = prompt("Enter new image url:");
  const updatedNotes = prompt("Enter the updated notes:");

  const updatedRecipe = {
    recipe: updatedRecipeName,
    ingredients: updatedIngredients,
    instructions: updatedInstructions,
    recipeImage: updatedImage,
    recipeNotes: updatedNotes,
  };

  const newRecipe = createCard(updateRecipe);

  axios
    .put(`${baseURL}/api/updateRecipe/${recipeid}/${userid}`, updatedRecipe)
    .then((res) => {
      while (recipeContainer.firstChild) {
        recipeContainer.removeChild(recipeContainer.firstChild);
      }
      res.data.forEach((recipe) => {
        // Create a card element for each recipe
        let card = createCard(recipe);
        recipeContainer.appendChild(card);
      });
      console.log("Recipe updated:", res.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

// RECIPE INPUT EVENT LISTENER

recipeBtn.addEventListener("click", createRecipe);
displayBtn.addEventListener("click", displayRecipes);
