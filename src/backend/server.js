const express = require("express");
const cors = require("cors");
const userRoutes = require("./api/user.route");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/mentileaders", userRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports = { app };
