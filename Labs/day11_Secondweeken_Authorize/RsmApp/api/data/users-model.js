// 1. include
var mongoose = require("mongoose");

// Create Schema
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

// Register model
mongoose.model("User", userSchema, "users");