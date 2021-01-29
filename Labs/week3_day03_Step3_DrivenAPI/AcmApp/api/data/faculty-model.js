var mongoose = require("mongoose");

var facultySchema = new mongoose.Schema({
    name: String,
    course: String,
    username: String,
    password: String
});

// model
mongoose.model("Faculty", facultySchema, "faculty");