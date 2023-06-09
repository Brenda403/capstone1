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

// event listeners below should match the buttons.
// LOGIN EVENT LISTENER
logInBtn.addEventListener("click", login);
signUpBtn.addEventListener("click", signUp);

// RECIPE INPUT EVENT LISTENER

// recipeBtn.addEventListener("click", createRecipe);
// displayBtn.addEventListener("click", displayRecipes);
