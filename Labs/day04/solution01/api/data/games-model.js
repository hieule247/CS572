var mongoose = require("mongoose");

// Declare Games schema
var gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    designer: [String],
    player: {
        type: Number,
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    }
});
// compile model: Collection in mongoDB is Games
mongoose.model("Game", gameSchema, "games");
