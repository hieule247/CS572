var mongoose = require("mongoose");

// Declare Games schema
var gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    minAge: Number,
    designers: [String]     
    // publisher: String,
    // reviews: [String]
});
// compile model: Collection in mongoDB is Games
mongoose.model("Game", gameSchema, "games");
