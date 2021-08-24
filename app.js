const express = require("express");
const cors = require("cors");
const {
  signToken,
  verifyToken,
  genPass,
  checkPass,
} = require("./helpers/util");
const { User, Animal, Chat } = require("./models");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//! login
app.post("/login", async (req, res, next) => {
  try {
    const { email: userEmail, password } = req.body;
    const result = await User.findOne({ where: { email: userEmail } });
    if (!result) throw { code: 401, name: "Unauthorized" };

    const isUser = checkPass(password, result.password);
    if (!isUser) throw { code: 401, name: "Unauthorized" };

    const { id, username, email, profilePict } = result;
    const access_token = signToken({ id, email });
    const userProfile = {
      access_token: access_token,
      id,
      username,
      email,
      profilePict,
    };
    res
      .status(200)
      .json({ userProfile, message: "you have succesfully login" });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

//!Auth
// const authentication = async (req, res, next) => {
//   try {
//     if(!req.headers.access_token) throw { code: 401, name: 'InvalidToken' }

//     const {access_token: accessToken} = req.headers;
//     const payload = authToken(accessToken);

//     const isUser = await User.findByPk(payload.id)
//     if(!isUser) throw { code: 401, name: 'Unauthorized' }

//     req.user = {
//       id: payload.id,
//       username: payload.username,
//       email: payload.email,
//       profilePict: payload.profilePict
//     }
//     next();
//   } catch(err) {
//     next(err);
//   }
// }

//! Error handling
app.use((err, req, res, next) => {
  let code = err.code || 500;
  let msg = "Internal Server Error";

  if (err.name === "Unauthorized") {
    msg = "invalid user email/password";
  }
  res.status(code).json(msg);
});

app.listen(PORT, () => {
  console.log("🚀 ~ file: app.js ~ line 7 ~ app.listen ~ PORT", PORT);
});
