const Student = require("../models/student.model");
const router = require("express").Router();

router.route("/new").post((req, res) => {
  const newStudent = new Student(req.body);
  newStudent
    .save()
    .then((student) => res.json(student))
    .catch((err) => res.status(400).json("Ah Shit! " + err));
});

router.route("/").get();

router.route("/delete/:id").delete();

router.route("/update/:id").put();

module.exports = router;
