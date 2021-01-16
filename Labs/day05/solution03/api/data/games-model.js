var mongoose = require("mongoose");

// Reviews schema
var reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: false
    },
    review: {
        type: String,
        required: false
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});
// Publisher schema
var publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    country: {
        type: Number,
        required: false
    },
    established: {
        type: Date,
        required: false
    },
    location: {
        address: String,
        // store cordinates in order long(W/E), lat(N/S)
        coodinates: {
            type: [Number],
            index: "2dsphere"
        }
    }
});
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
    designers: [String],     
    publisher: publisherSchema,
    reviews: [reviewSchema]
});
// compile model: Collection in mongoDB is Games
mongoose.model("Game", gameSchema, "games");
