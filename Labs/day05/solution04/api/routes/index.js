var express = require("express");
var router = express.Router();
const controllerStudents = require("../controllers/students-controllers");
const controllerAddresses = require("../controllers/addresses-controllers");

// ----- Using for Students -----
// ----- Student: GetAll, AddOne -----
router.route("/students")
    .get(controllerStudents.studentsGetAll)
    .post(controllerStudents.studentsAddOne)
;
// GET--GetOne, PUT--UpdateOne, DELETE--DeleteOne
router.route("/students/:studentId")
    .get(controllerStudents.studentsGetOne)
    .put(controllerStudents.studentsUpdateOne)
    .delete(controllerStudents.studentsDeleteOne)
;

// ----- Address: GetAll, AddOne -----
router.route("/students/:studentId/addresses")
    .get(controllerAddresses.addressesGetAll)
    .post(controllerAddresses.addressesAddOne)
    ;
// ----- Address: GetOne, UpdateOne, DeletOne -----
router.route("/students/:studentId/addresses/:addressId")
    .get(controllerAddresses.addressesGetOne)
    .put(controllerAddresses.addressesUpdateOne)
    .delete(controllerAddresses.addressesDeleteOne)
    ;    
// ----- Exports -----
module.exports = router;


