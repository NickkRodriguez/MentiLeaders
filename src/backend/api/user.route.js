const express = require("express");
const UserCtrl = require("./user.controller");
const router = express.Router();

router.route("/").get(UserCtrl.apiGetUsers);

router.route("/users").post(UserCtrl.apiPostUser);

router.route("/users/class").put(UserCtrl.apiUpdateUserClass);

router.route("/users/score").put(UserCtrl.apiUpdateUserScore);

router.route("/test").post((req, res) => {
  res.status(201).json({ message: "This is just a test" });
});

module.exports = router;
