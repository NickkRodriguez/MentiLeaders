const express = require("express");
const cors = require("cors");
const studentRoutes = require("./controllers/student.controller");
const authRoutes = require("./controllers/auth.controller");
const { auth } = require("express-openid-connect");
require("dotenv").config();

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:3000",
  clientID: "L1bcGYFYXrKzyLFaOjBdxm9yC1bUdPkQ",
  issuerBaseURL: "https://dev-3flou5z2.us.auth0.com",
  secret: process.env.SECRET,
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/students", studentRoutes);
app.use(auth(config));
app.use("", authRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}.`);
});

module.exports = { app, server };
