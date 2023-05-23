//const { default: axios } = require("axios");

// base url here
const baseURL = `http://localhost:4000`;

// LOGIN HTML CODE

// pull in login form buttons to add event listeners below
const signUpBtn = document.getElementById("sign-up-btn");
const logInBtn = document.getElementById("log-in-btn");
//pull in input (text) areas from login
const username = document.getElementById("username");
const newUser = document.getElementById("new-user");
const password = document.getElementById("password");
const newPassword = document.getElementById("new-password");

// // PROFILE HTML CODE

// // recipe card form button
// const recipeBtn = document.getElementById("recipe-submit-btn");
// // display all recipes button & container
// const displayBtn = document.getElementById("display-btn");
// const recipeContainer = document.getElementById("recipe-container");

// // recipe card input
// const recipeName = document.getElementById("recipe-name");
// const ingredients = document.getElementById("ingredients");
// const instructions = document.getElementById("instructions");
// const recipeImage = document.getElementById("img-url");
// const recipeNotes = document.getElementById("recipe-notes");

// 1st Main Feature- 2 parts: sign up and log in

// SIGN UP
const signUp = (e) => {
  e.preventDefault();
  let body = { username: newUser.value, password: newPassword.value }; // make sure they match the HTML value element names.
  axios
    .post(`${baseURL}/api/signUp`, body)
    .then(async (res) => {
      // console.log("hit signup");
      let token = await res.data.token;
      console.log(res.data);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userid", res.data.userid); // .id is the primary key on your user table
      window.location.href = `profile.html`; //this will be where you are redirected after you login
    })
    .catch((err) => console.log(err));
};

// LOG IN
const login = (e) => {
  e.preventDefault();
  let body = { username: username.value, password: password.value };
  axios
    .post(`${baseURL}/api/login`, body)
    .then((res) => {
      console.log(res.data);
      let token = res.data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userid", res.data.userid); // .id is the primary key on your user table
      window.location.href = `profile.html`; // this will be where you are redirected after you login
    })
    .catch((err) => console.log(err));
};

//sessionStorage.getItem("userId") to put the user id into the table

// 2nd Main Feature create a recipe

// CREATE RECIPE
// const createRecipe = (e) => {
//   e.preventDefault();
//   let userId = sessionStorage.getItem("userid");
//   console.log("hello");
//   console.log(userId);
//   console.log(sessionStorage);
//   let body = {
//     recipe: recipeName.value,
//     ingredients: ingredients.value,
//     instructions: instructions.value,
//     recipeImage: recipeImage.value,
//     recipeNotes: recipeNotes.value,
//     userId: userId,
//   };

//   axios
//     .post(`${baseURL}/api/createRecipe`, body)
//     .then(async (res) => {
//       //let recipe = await res.data.recipe;
//       console.log(res.data);
//       // clear the input fields after successful creation
//       recipeName.value = "";
//       ingredients.value = "";
//       instructions.value = "";
//       recipeImage.value = "";
//       recipeNotes.value = "";
//       // Store the userId in sessionStorage
//       sessionStorage.setItem("userId", res.data.userId);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
// // 3rd main feature

// // DISPLAY RECIPES
// const displayRecipes = () => {
//   axios
//     .get(`${baseURL}/api/displayRecipes?userid=userid`, {
//       //userId: sessionStorage.getItem("userid"),
//     })
//     .then((res) => {
//       console.log(res.data);
//       res.data.forEach((recipe) => {
//         // Create a card element for each recipe
//         const card = document.createElement("div");
//         card.classList.add("recipe-card");

//         // content and attributes of the card based on recipes data
//         card.innerHTML = `
//           <h3>${recipe.recipename}</h3>
//           <p>${recipe.ingredients}</p>
//           <p>${recipe.instructions}</p>
//           <img src="${recipe.imgurl}" alt="${recipe.recipename}">
//           <p>${recipe.summary}</p>
//           <button class="deleteBtn" onclick="deleteRecipe(${recipe.recipeid})">Delete</button>
//           <button class="updateBtn" onclick="updateRecipe(${recipe.recipeid})">Update</button>
//         `;

//         recipeContainer.appendChild(card);
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
// //const deleteBtn = document.querySelector(".deleteBtn");

// // 4th Main Feature delete recipes

// const deleteRecipe = (recipeid) => {
//   console.log(recipeid);
//   axios
//     .delete(`${baseURL}/api/deleteRecipe/${recipeid}`)
//     .then(() => {
//       displayRecipes();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // 5th Main Feature update recipes
// const updateRecipe = (recipeid) => {
//   //user prompts

//   const updatedRecipeName = prompt("Enter the updated recipe name:");
//   const updatedIngredients = prompt("Enter the updated ingredients:");
//   const updatedInstructions = prompt("Enter the updated instructions:");
//   const updatedImage = prompt("Enter new image url:");
//   const updatedNotes = prompt("Enter the updated notes:");

//   const updatedRecipe = {
//     recipe: updatedRecipeName,
//     ingredients: updatedIngredients,
//     instructions: updatedInstructions,
//     recipeImage: updatedImage,
//     recipeNotes: updatedNotes,
//   };
//   axios
//     .put(`${baseURL}/api/updateRecipe/${recipeid}`, updatedRecipe)
//     .then((res) => {
//       displayRecipes();
//       console.log("Recipe updated:", res.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// event listeners below should match the buttons.
// LOGIN EVENT LISTENER
logInBtn.addEventListener("click", login);
signUpBtn.addEventListener("click", signUp);

// RECIPE INPUT EVENT LISTENER

// recipeBtn.addEventListener("click", createRecipe);
// displayBtn.addEventListener("click", displayRecipes);
