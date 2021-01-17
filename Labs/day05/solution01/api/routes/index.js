var express = require("express");
var router = express.Router();
const controllerGames = require("../controllers/games-controllers");

// ----- Game: GetAll, AddOne -----
router.route("/games")
    .get(controllerGames.gamesGetAll)
    .post(controllerGames.gamesAddOne)
    ;
// ----- Game: GetOne, UpdateOne, DeletOne -----
router.route("/games/:gameId")
    .get(controllerGames.gamesGetOne)
    .put(controllerGames.gamesUpdateOne)
    .delete(controllerGames.gamesDeleteOne)
    ;
// ----- exports
module.exports = router;


