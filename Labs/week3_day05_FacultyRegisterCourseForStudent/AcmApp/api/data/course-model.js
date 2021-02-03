var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
    name: String,
    notes: String
});

// model
module.exports = mongoose.model("Course", courseSchema, "courses");