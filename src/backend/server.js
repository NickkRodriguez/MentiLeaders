const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentRoutes = require("./controllers/student.controller");
require("dotenv").config();

const app = express();
const source = process.env.ATLAS_CONNECTION;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/students", studentRoutes);
mongoose.connect(source, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("DB connected.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}.`);
});
