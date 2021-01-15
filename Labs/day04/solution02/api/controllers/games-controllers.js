// using mongoose
var mongoose = require("mongoose");
var Game = mongoose.model("Game");

// ---- Full: checking and hardening 
module.exports.gamesGetAll = function(req, res) {
    console.log("Get all games");
    console.log(req.query);
    var offset = 0;
    var count = 5;
    const maxCount = 10;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    // ----- check validate
    console.log("Count is: ", count);
    if (isNaN(offset) || isNaN(count)){
        res.status(400).json({"message": "offset and count in QueryString should be numbers." });
        return;
    }

    if (count > maxCount) {
        res.status(400).json({"message": "Cannot exceed count of " + maxCount});
        return;
    }
    // using Mongoose
    Game.find().skip(offset).limit(count).exec(function(err, games) {
        // Is Error        
        if (err) {
            console.log(err);
            res.status(500).json(err);
            return;
        }
        console.log("Found games: ", games.length);
        res.status(200).json(games);
    });
}

module.exports.gamesGetOne = function(req, res) {
    console.log("Get one");
    var gameId = req.params.gameId;
    console.log(gameId);
    Game.findById(gameId).exec(function(err, game){
        // default response value
        var strLog = "Get game succesful";
        var response = {
            status: 200,
            message: game
        }
        // Processing
        if (err) {
            strLog = "Error finding game";
            response.status = 500;
            response.message = err;
        } else if (!game){
            strLog = "Game ID not found";
            response.status = 404;
            response.message = {"message": "Game ID not found"};
        }
        console.log(strLog);
        // response send to client
        res.status(response.status).json(response.message);
    });
}
