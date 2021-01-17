// using mongoose
const { response } = require("express");
var mongoose = require("mongoose");
var Game = mongoose.model("Game");

// GetAll + GetOne
module.exports.publisherGet = function(req, res) {
    console.log("Publisher: Get");
    var gameId = req.params.gameId;
    console.log(gameId);
    Game.findById(gameId).select("publisher").exec(function(err, game){
        var response = {
            status: 200,
            message: []
        }
        // Processing
        if (err) {
            strLog = "Error finding game";
            response.status = 500;  
            response.message = err;
        } else if (!game){
            strLog = "Game ID not found: ", gameId;
            response.status = 404;
            response.message = {"message": "Game ID not found " + gameId};
        } else {
            response.message = game.publisher ? game.publisher : [];
        }
        console.log("Get publisher....OK");
        // response send to client
        res.status(response.status).json(response.message);
    });
}

// Add One
var _addPublisher = function(req, res, game) {
    console.log("_addPublisher");
    if (!game.publisher) {
        console.log("...null...must create");
        game.publisher = new Object;
    }
    // update data fields
    game.publisher.name = req.body.name;
    // game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, updatedGame) {
        var response = {
            status: 200,
            message: []
        }
       if (err) {
            response.status = 500;
            response.message= err;
        } else {
            response.status = 201;
            response.message= updatedGame.publisher;
        } 
        // send back
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherAdd = function(req, res){
    console.log("Publisher: Add");
    var gameId = req.params.gameId;
    console.log(gameId);

    Game.findById(gameId).select("publisher").exec(function(err, game){
        var response = {
            status: 200,
            message: []
        };
        // error
        if (err) {
            console.log("Error finding game.");
            response.status = 500;
            response.message= err;
        } else if (!game){
            console.log("Game ID not found", gameId);
            response.status = 404;
            response.message= {"message": "Game ID not found: " + gameId};
        }
        // Some things went wrong
        if (game) {
            _addPublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);            
        } 
    });
}

// --------- UpdateOne
var _updatePublisher = function(req, res, game) {
    console.log("_updatePublisher");
    if (!game.publisher) {
        console.log("...null...must create");
        game.publisher = new Object;
    }    // update data fields
    game.publisher.name = req.body.name;
    // game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, updatedGame) {
        var response = {
            status: 204,
            message: updatedGame.publisher
        }
       if (err) {
            response.status = 500;
            response.message= err;
        } 
        // send back
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherUpdate = function(req, res){
    console.log("Publisher: Update");
    var gameId = req.params.gameId;
    console.log(gameId);

    Game.findById(gameId).select("publisher").exec(function(err, game){
        var response = {
            status: 200,
            message: []
        };
        // error
        if (err) {
            console.log("Error finding game.");
            response.status = 500;
            response.message= err;
        } else if (!game){
            console.log("Game ID not found", gameId);
            response.status = 404;
            response.message= {"message": "Game ID not found: " + gameId};
        }
        // Some things went wrong
        if (game) {
            _updatePublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);            
        } 
    });
}

// DeleteOne
var _deletePublisher = function(req, res, game) {
    console.log("_deletePublisher");
    // update data fields
    game.publisher.remove();
    game.save(function(err, game) {
        var response = {
            status: 204,
            message: "Deleted publisher."
        }
       if (err) {
            response.status = 500;
            response.message= err;
        } 
        // send back
        res.status(response.status).json(response.message);
    });
}

module.exports.publisherDelete = function(req, res){
    console.log("Publisher: Delete");
    var gameId = req.params.gameId;
    console.log(gameId);

    Game.findById(gameId).select("publisher").exec(function(err, game){
        var response = {
            status: 204,
            message: []
        };
        // error
        if (err) {
            console.log("Error finding game.");
            response.status = 500;
            response.message= err;
        } else if (!game){
            console.log("Game ID not found", gameId);
            response.status = 404;
            response.message= {"message": "Game ID not found: " + gameId};
        }
        // Some things went wrong
        if (game) {
            _deletePublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);            
        } 
    });
}

