// require("dotenv").config();
// //const bcrypt = require("bcryptjs");
// const { CONNECTION_STRING } = process.env;
// const Sequelize = require("sequelize");
// //const jwt = require("jsonwebtoken");

// const sequelize = new Sequelize(CONNECTION_STRING, {
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       rejectUnauthorized: false,
//     },
//   },
// });

// module.exports = {
//   createRecipe: (req, res) => {
//     const { recipe, ingredients, instructions, recipeImage } = req.body;
//     sequelize
//       .query(
//         `INSERT INTO recipes (recipename, ingredients, instructions, imgurl, summary) values (${recipe}, ${ingredients}, ${instructions}, ${recipeImage});`
//       )
//       .then(([result]) => {
//         const recipeId = result.id;
//         sequelize
//           .query(
//             `INSERT INTO userrecipes (userId, recipeId) values (${userId}, ${recipeId});`
//           )
//           .then((dbRes) => {
//             res.status(200).send(dbRes[0]);
//           });
//       })
//       .catch((err) => console.log(err));
//   },
// };
