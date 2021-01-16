var mongoose = require("mongoose");

// Address schema
var addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zip: String,
    building: String
});
// Student schema
var studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gpa: {
        type: Number,
        min: 1.0,
        max: 10.0
    },
    addresses: [addressSchema]
});
// compile model: Collection in mongoDB is Students
mongoose.model("Student", studentSchema, "Students");

