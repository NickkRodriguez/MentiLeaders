const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

module.exports = router;
