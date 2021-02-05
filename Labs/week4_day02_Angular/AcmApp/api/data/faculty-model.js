var mongoose = require("mongoose");
require("./course-model");

var facultySchema = new mongoose.Schema({
    name: String,
    course: String,
    username: String,
    password: String,
    courses: [mongoose.model("Course").schema]
});

// model
mongoose.model("Faculty", facultySchema, "faculties");