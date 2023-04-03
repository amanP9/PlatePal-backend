const express = require("express");
const router = express.Router();
const mongoCollections = require("../config/mongoCollections");
const mongoConnection = require("../config/mongoConnection");
const users = mongoCollections.users;
const { ObjectId } = require("mongodb");
const validateInput = require("../helpers");
const usersFunctions = require("../data/users");

router
  .route("/signup")
  .get(async (req, res) => {
    const user = req.session.user;
    if (user) {
      res
        .status(200)
        .json({ message: "User is already signed-up and is logged in!" });
    } else {
      res.status(200).json({ message: "Post your credentials to sign-up now" });
    }
  })
  .post(async (req, res) => {
    if (req.session.user) {
      return res.status(401).json({ message: "Please Log-Out to Sign-Up" });
    }
    try {
      let nameInput = req.body.name;
      let usernameInput = await req.body.username;
      let passwordInput = await req.body.password;

      nameInput = validateInput.checkReviewerName(nameInput);
      usernameInput = validateInput.checkUsername(usernameInput);
      passwordInput = validateInput.checkPassword(passwordInput);

      const newUser = await usersFunctions.createUser(
        nameInput,
        usernameInput,
        passwordInput
      );

      return res.status(200).json(newUser);
    } catch (e) {
      return res.status(400).json({ message: e });
    }
  });

router.route("/login").post(async (req, res) => {
  try {
    let usernameInput = req.body.username;
    let passwordInput = req.body.password;

    usernameInput = validateInput.checkUsername(usernameInput);
    passwordInput = validateInput.checkPassword(passwordInput);

    let found = false;

    const checkUserAuthentication = await usersFunctions.checkUser(
      usernameInput.toLowerCase(),
      passwordInput
    );

    if (!checkUserAuthentication) throw "Error";

    req.session.user = { username: usernameInput };
    console.log({ message: "Login Successful" });
    return res.status(200).json(checkUserAuthentication);
  } catch (e) {
    error = "Either the username or password is invalid";
    return res.status(401).json({ message: error });
  }
});

router.route("/logout").get(async (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error: Could not Log Out!" });
      } else {
        return res.status(200).json({ message: "Logged out successfully!" });
      }
    });
  } else {
    return res
      .status(401)
      .json({ message: "Cannot Logout: No user is logged in" });
  }
});

module.exports = router;
