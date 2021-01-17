var express = require("express");
var router = express.Router();
const controllerGames = require("../controllers/games-controllers");
const controllerPublisher = require("../controllers/publisher-controller");
const controllerReviews = require("../controllers/reviews-controller");

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
// ----- Publisher: AddOne, GetOne, UpdateOne, DeletOne -----
router.route("/games/:gameId/publisher")
    .get(controllerPublisher.publisherGet)
    .post(controllerPublisher.publisherAdd)
    .put(controllerPublisher.publisherUpdate)
    .delete(controllerPublisher.publisherDelete);
// ----- Reviews: GetAll, AddOne -----
router.route("/games/:gameId/reviews")
    .get(controllerReviews.reviewsGetAll)
    .post(controllerReviews.reviewsAddOne)
    ;
// ----- Game: GetOne, UpdateOne, DeletOne -----
router.route("/games/:gameId/reviews/:reviewId")
    .get(controllerReviews.reviewsGetOne)
    .put(controllerReviews.reviewsUpdateOne)
    .delete(controllerReviews.reviewsDeleteOne)
    ;
// ----- exports
module.exports = router;


