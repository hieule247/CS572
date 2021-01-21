var express = require("express");
var router = express.Router();
// controllers path
const ctrlrRepairs  = require("../controllers/repairs-controllers");
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
// ----- Exports -----
module.exports = router;


