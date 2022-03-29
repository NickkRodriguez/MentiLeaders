const express = require("express");
const cors = require("cors");
const studentRoutes = require("./controllers/student.controller");
const { connectDB } = require("./database");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/students", studentRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}.`);
});

module.exports = { app, server };
