var express = require("express");
var router = express.Router();
const controllerGames = require("../controllers/games-controllers");

router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameId").get(controllerGames.gamesGetOne);
// router.route("/games/new").post(controllerGames.gamesAddOne);

module.exports = router;


