var express = require("express");
var ctrlrJobs       = require("../controllers/jobs-controller.js");
var ctrlrlocation   = require("../controllers/location-controller.js"); 

// local variables
var router = express.Router();

// Define route: Jobs
router.route("/jobs")
    .get(ctrlrJobs.jobsGetAll)
    .post(ctrlrJobs.jobsAddOne)
    ;
router.route("/jobs/:jobId")
    .get(ctrlrJobs.jobsGetOne)
    .put(ctrlrJobs.jobsUpdOne)
    .delete(ctrlrJobs.jobsDelOne)
    ;
// Define route: location
router.route("/jobs/:jobId/location")
    .get(ctrlrlocation.locationGetAll)
    .post(ctrlrlocation.locationAddOne)
    .put(ctrlrlocation.locationUpdOne)
    .delete(ctrlrlocation.locationDelOne)    
    ;


// Export module
module.exports = router;    