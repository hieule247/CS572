var express = require("express");
var router = express.Router();
const controllerGames = require("../controllers/games-controllers");
const controllerPublisher = require("../controllers/publisher-controller");
const controllerReviews = require("../controllers/reviews-controller");

// --- authen Step 03/4: step_03.01/3: Declare controller
var controllerUsers = require("../controllers/users-controller.js");

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

// --- authen Step 03/4: step_03.02/3: Declare route
router.route("/users")
    .get(controllerUsers.getAll)
    ;
router.route("/users/:username")
    .delete(controllerUsers.delOne)
    ;

router.route("/users/register")
    .post(controllerUsers.register)
    ;
router.route("/users/login")
    .post(controllerUsers.login)
    ;
// END --- authen Step 03/4: step_03.02/3.

// ----- Search Games -----
router.route("/search")
    .post(controllerGames.gamesSearch)
    ;

// --- authen Step 03/4: step_03.03/3: exports router
// export router
module.exports = router;


