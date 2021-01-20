// using mongoose
const { response } = require("express");
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

// UpdateOne
module.exports.gamesUpdateOne = function(req, res) {
    console.log("PUT: games UpdateOne");
    var gameId = req.params.gameId;
    console.log(gameId);

    Game.findById(gameId).select("-reviews -publisher").exec(function(err, game){
        var response = {
            status: 204,
            message: game
        };
        // error
        if (err) {
            response.status = 500;
            response.message= err;
        } else if (!game){
            response.status = 404;
            response.message= {"message": "Game ID not found"};
        }
        // Some things went wrong
        if (response.status !== 204) {
            res.status(response.status).json(response.message);            
        } else {
            // We got the game. Now update data
            game.title = req.body.title;
            game.year = parseInt(req.body.year);           
            game.rate = parseInt(req.body.rate);
            game.price = parseFloat(req.body.price);
            game.minPlayers = parseInt(req.body.minPlayers);
            game.maxPlayers = parseInt(req.body.maxPlayers);
            game.minAge = parseInt(req.body.minAge);   
            game.designers = req.body.designers;
            // publisher: "",
            // reviews: "",
            // ---- Save Game
            game.save(function(err, updateGame) {
                // is error at Server
                if (err) {
                    response.status = 500;
                    response.message= err;
                }
                // send back info to client
                response.message = updateGame;
                res.status(response.status).json(response.message);
            }) 
        } 
    });
}

// UpdateOne
module.exports.gamesDeleteOne = function(req, res) {
    console.log("DELETE: games DeleteOne");
    var gameId = req.params.gameId;
    console.log(gameId);

    Game.findByIdAndRemove(gameId).exec(function(err, deletedGame){
        var response = {
            status: 204,
            message: deleteGame
        };
        // error
        if (err) {
            response.status = 500;
            response.message= err;
        } else if (!deleteGame){
            response.status = 404;
            response.message= {"message": "Game ID not found"};
        }
        // Send back to client
        res.status(response.status).json(response.message);    
    });
}

module.exports.gamesAddOne = function(req, res){
    console.log("POST: Game AddOne");
    if (req.body && req.body.title){
        Game.create({
            title: req.body.title,
            year: parseInt(req.body.year),           
            rate: parseFloat(req.body.rate),
            price: parseFloat(req.body.price),
            minPlayers: parseInt(req.body.minPlayers),
            maxPlayers: parseInt(req.body.maxPlayers),
            minAge: parseInt(req.body.minAge),   
            // publisher: "",
            // reviews: "",
            designers: req.body.designers
            }, function(err, game){
                var response = {
                    status: 201, 
                    message: game
                };
                // Error check
                if (err){
                    response.status = 400;
                    response.message= err;
                }
                // send back
                res.status(response.status).json(response.message);            
        });
    } else {
        console.log("Data missing from POST body");
        res.status(400).json({error: "Require data missing from POST"});
    }
}
