const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const studentSchema = new Schema({
  username: { type: String, required: true },
  score: { type: Number, min: 1 },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
