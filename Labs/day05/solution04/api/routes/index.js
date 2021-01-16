var express = require("express");
var router = express.Router();
const controllerStudents = require("../controllers/students-controllers");
const controllerAddresses = require("../controllers/addresses-controllers");

// ----- Using for Students -----
// GET--GetAll, POST--AddOne
router.route("/students")
    .get(controllerStudents.studentsGetAll)
    // .post(controllerStudents.studentsAddOne)
;
// GET--GetOne, PUT--UpdateOne, DELETE--DeleteOne
router.route("/students/:studentId")
    .get(controllerStudents.studentsGetOne)
    // .put(controllerStudents.studentsUpdateOne)
    // .delete(controllerStudents.studentsDeleteOne)
;
// ----- Using for Addresss -----
router.route("/students/:studentId/addresses")
    .get(controllerAddresses.addressesGetAll);
router.route("/students/:studentId/addresses/:addressId")
    .get(controllerAddresses.addressesGetOne);
// ----- Exports -----
module.exports = router;


