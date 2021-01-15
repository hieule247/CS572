var express = require("express");
var router = express.Router();
// const controllerGames = require("../controllers/games-controllers");
const controllerStudents = require("../controllers/students-controllers");
const controllerAddresses = require("../controllers/addresses-controllers");

// ----- Using for GamesDB
// router.route("/students").get(controllerGames.gamesGetAll);
// router.route("/students/:studentId").get(controllerGames.gamesGetOne);
// router.route("/students/new").post(controllerStudents.studentsAddOne);

// ----- Using for Students
router.route("/students").get(controllerStudents.studentsGetAll);
router.route("/students/:studentId").get(controllerStudents.studentsGetOne);
// Using for Addresss
router.route("/students/:studentId/addresses").get(controllerAddresses.addressesGetAll);
router.route("/students/:studentId/addresses/:addressId").get(controllerAddresses.addressesGetOne);
// Exports
module.exports = router;


