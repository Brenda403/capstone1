require("dotenv").config();
const bcrypt = require("bcryptjs");
const { CONNECTION_STRING, SECRET } = process.env;
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");

// < where it says "email" and "passhash" change to match the column names in DB "username" and "password" respectively. He labeled his table to watch users > change to recipes (my table name).

// watch.users.id

const createToken = (email, id) => {
  return jwt.sign(
    {
      email,
      id,
    },
    SECRET,
    {
      expiresIn: "2 days",
    }
  );
};

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  userLogin: (req, res) => {
    const { username, password } = req.body;
    sequelize
      .query(`select * from users where username = '${username}'`)
      .then((dbRes) => {
        if (!dbRes[0][0]) {
          return res.status(400).send("Account not found, try signing up");
        }
        // const {passhash} = dbRes[0][0]

        const authenticated = bcrypt.compareSync(
          password,
          dbRes[0][0].password
        );
        console.log(dbRes[0][0].password.length);
        if (!authenticated) {
          return res.status(403).send("incorrect password");
        }
        delete dbRes[0][0].password;
        const token = createToken(username, dbRes[0][0].id);
        console.log("token", token);
        const userToSend = { ...dbRes[0][0], token };
        res.status(200).send(userToSend);
      })
      .catch((err) => console.log(err));
  },
  userSignup: (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    sequelize
      .query(`select * from users where username = '${username}'`)
      .then((dbRes) => {
        console.log(dbRes[0]);
        if (dbRes[0][0]) {
          return res.status(400).send("Email is already in use, try login");
        } else {
          let salt = bcrypt.genSaltSync(10);
          const passhash = bcrypt.hashSync(password, salt);
          sequelize
            .query(
              `
                      insert into users(username,password) values('${username}','${passhash}');
                      select * from users where username = '${username}';
                  `
            )
            .then((dbResponse) => {
              // console.log(dbRes[0])
              delete dbResponse[0][0].passhash;
              const token = createToken(username, dbResponse[0][0].id);
              console.log("token", token);
              const userToSend = { ...dbResponse[0][0], token };
              console.log(userToSend);
              res.status(200).send(userToSend);
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  },
};
