var express = require("express");
var router = express.Router();
// controllers path
const ctrlrUsers = require("../controllers/users-controllers");
const ctrlrRepairs = require("../controllers/repairs-controllers");
const ctrlrTechnician= require("../controllers/technicians-controllers");
// ----- route processing
// --- using for Repairs
router.route("/repairs")
    .get(ctrlrRepairs.repairsGetAll)
    .post(ctrlrRepairs.repairsAddOne)
    ;
router.route("/repairs/:repairId")
    .get(ctrlrRepairs.repairsGetOne)
    .put(ctrlrRepairs.repairsUpdOne)
    .delete(ctrlrRepairs.repairsDelOne)
    ;    
// --- using for Technicians
router.route("/repairs/:repairId/technicians")
    .get(ctrlrTechnician.techniciansGetAll)
    .post(ctrlrTechnician.techniciansAddOne)
    ;
router.route("/repairs/:repairId/technicians/:technicianId")
    .get(ctrlrTechnician.techniciansGetOne)
    .put(ctrlrTechnician.techniciansUpdOne)
    .delete(ctrlrTechnician.techniciansDelOne)
    ;

// ----- Search Games -----
router.route("/search")
    .post(ctrlrRepairs.repairsSearch)
    ;
// ----- System users -----
// --- authen Step 03/4: step_03.02/3: Declare route
router.route("/users")
    .get(ctrlrUsers.getAll)
    ;
router.route("/users/:username")
    .delete(ctrlrUsers.delOne)
    ;

router.route("/users/register")
    .post(ctrlrUsers.register)
    ;
router.route("/users/login")
    .post(ctrlrUsers.login)
    ;
// END --- authen Step 03/4: step_03.02/3.

// ----- Exports -----
module.exports = router;


