const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const {
  userLogin,
  userSignup,
  createRecipe,
  getRecipes,
  deleteRecipeCard,
  updateRecipe,
} = require("./auts.controler.js");
//const { createRecipe } = require("./controller.js");

app.post("/api/login", userLogin);
app.post("/api/signUp", userSignup);
app.post("/api/createRecipe", createRecipe);
app.get("/api/displayRecipes", getRecipes);
app.delete(`/api/deleteRecipe/:recipeid`, deleteRecipeCard);
app.put("/api/updateRecipe/:recipeid", updateRecipe);

app.listen(4000, () => console.log("Server running on port 4000"));
