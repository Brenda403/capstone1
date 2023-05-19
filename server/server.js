const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const { userLogin, userSignup } = require("./auts.controler.js");

app.post("/api/login", userLogin);
app.post("/api/signUp", userSignup);

app.listen(4000, () => console.log("Server running on port 4000"));
