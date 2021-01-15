var mongoose = require("mongoose");

// Address schema
var addressSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.ObjectId,
    },
    street: String,
    city: String,
    state: String,
    zip: String,
    building: String
});
// compile model: Collection in mongoDB is Addresss
// mongoose.model("Address", addresSchema, "address");
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
    address: [addressSchema]
});
// compile model: Collection in mongoDB is Students
mongoose.model("Student", studentSchema, "Students");

