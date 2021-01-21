// using mongoose
const { response } = require("express");
var mongoose = require("mongoose");
var Game = mongoose.model("Game");


// GetAll
module.exports.reviewsGetAll = function(req, res) {
    console.log("Reviews: GetAll");
    var gameId = req.params.gameId;
    console.log(gameId);
    Game.findById(gameId).select("reviews").exec(function(err, game){
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
            response.message = game.reviews ? game.reviews : [];
        }
        console.log("Get publisher....OK");
        // response send to client
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewsGetOne = function(req, res) {
    console.log("Reviews: GetOne");
    var gameId = req.params.gameId;
    var reviewId = req.params.reviewId;
    console.log("Get review Id " + reviewId + ", for game Id " + gameId);
    Game.findById(gameId).select("reviews").exec(function(err, game){
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
            response.message = game.reviews.id(reviewId);
        }
        console.log("Get reviews....OK");
        // response send to client
        res.status(response.status).json(response.message);
    });
}

// DeleteOne
var _deleteOneReview = function(req, res, game, reviewId) {
    console.log("_deleteOneReview");
    // get theView
    const review = game.reviews.id(reviewId);
    if (!review){
        res.status(404).json({"error": "the View not found"});
        return;          
    }
    // remove
    review.remove();
    // save
    game.save(function(err, game) {
        var response = {
            status: 204,
            message: "Deleted One review."
        }
       if (err) {
            response.status = 500;
            response.message= err;
        } 
        // send back
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewsDeleteOne = function(req, res){
    console.log("Reviews: Delete One");
    var gameId = req.params.gameId;
    var reviewId = req.params.reviewId;
    console.log("Delete review Id " + reviewId + ", In game Id " + gameId);

    Game.findById(gameId).select("reviews").exec(function(err, game){
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
            _deleteOneReview(req, res, game, reviewId);
        } else {
            res.status(response.status).json(response.message);            
        } 
    });
}

// --------- UpdateOne
var _updateOneReview = function(req, res, game, reviewId) {
    console.log("_updateOneReview...");
    // get theView
    const review = game.reviews.id(reviewId);
    if (!review){
        res.status(404).json({"error": "the View not found"});
        return;          
    }
    // update data fields
    review.name = req.body.name;
    // save data
    game.save(function(err, updatedGame) {
        var response = {
            status: 204,
            message: "Update succesful!"
        }
       if (err) {
            response.status = 500;
            response.message= err;
        } 
        // send back
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewsUpdateOne = function(req, res){
    console.log("Reviews: UpdateOne");
    var gameId = req.params.gameId;
    var reviewId = req.params.reviewId;
    console.log("Update review Id " + reviewId + ", In game Id " + gameId);

    Game.findById(gameId).select("reviews").exec(function(err, game){
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
            _updateOneReview(req, res, game, reviewId);
        } else {
            res.status(response.status).json(response.message);            
        } 
    });
}

var _addOneReview = function(req, res, game) {
    console.log("_addOneReview ...." + game.reviews.length);
    // Prepare for new review
    const len = game.reviews.length;    
    game.reviews[len] = new Object;
    // update data fields
    game.reviews[len].name = req.body.name;
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
            response.message= updatedGame.reviews;
        } 
        // send back
        res.status(response.status).json(response.message);
    });
}

module.exports.reviewsAddOne = function(req, res){
    console.log("Review: AddOne");
    var gameId = req.params.gameId;
    console.log("Add review for game Id " + gameId);

    Game.findById(gameId).select("reviews").exec(function(err, game){
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
            response.message= {"message": "Game ID not found:  " + gameId};
        }
        // Some things went wrong
        if (game) {
            _addOneReview(req, res, game);
        } else {
            res.status(response.status).json(response.message);            
        } 
    });
}




