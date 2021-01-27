// --- authen Step 01/4: Create file userS-model.js

var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: String,
    username:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
// Generate Model
mongoose.model("User", userSchema, "users");