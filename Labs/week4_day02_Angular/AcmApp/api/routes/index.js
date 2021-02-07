var express = require("express");
var ctrlrStudents = require("../controllers/students-controller");
var ctrlrFaculties= require("../controllers/faculties-controller");
var ctrlrAttends = require("../controllers/attends-controller");
var ctrlrCourses = require("../controllers/courses-controller");
var ctrlrMyImages = require("../controllers/myImages-controller");

var router = express.Router();
// ----- Faculties
router.route("/faculties")
    .get(ctrlrFaculties.facultiesGetAll)
    .post(ctrlrFaculties.facultiesAddOne)
    ;
router.route("/faculties/:facultyId")
    .get(ctrlrFaculties.facultiesGetOne)
    .post(ctrlrFaculties.facultiesAddOne)
    .put(ctrlrFaculties.facultiesUpdOne)
    .delete(ctrlrFaculties.facultiesDelOne)
    ;

// ----- Students
router.route("/students")
    .get(ctrlrStudents.studentsGetAll)
    .post(ctrlrStudents.studentsAddOne)
    ;
router.route("/students/:studentId")
    .get(ctrlrStudents.studentsGetOne)
    .post(ctrlrStudents.studentsAddOne)
    .put(ctrlrStudents.studentsUpdOne)
    .delete(ctrlrStudents.studentsDelOne)
    ;

// ----- Attends
router.route("/students/:studentId/attends")
    .get(ctrlrAttends.attendsGetAll)
    .post(ctrlrAttends.attendsAddOne)
    ;
router.route("/students/:studentId/attends/:attendId")
    .get(ctrlrAttends.attendsGetOne)
    .post(ctrlrAttends.attendsAddOne)
    .put(ctrlrAttends.attendsUpdOne)
    .delete(ctrlrAttends.attendsDelOne)
    ;

// ----- Courses
router.route("/courses")
    .get(ctrlrCourses.coursesGetAll)
    .post(ctrlrCourses.coursesAddOne)
    ;
router.route("/courses/:courseId")
    .get(ctrlrCourses.coursesGetOne)
    .post(ctrlrCourses.coursesAddOne)
    .put(ctrlrCourses.coursesUpdOne)
    .delete(ctrlrCourses.coursesDelOne)
    ;

// ----- MyImage
router.route("/myImages")
    .get(ctrlrMyImages.myImagesGetAll)
    .post(ctrlrMyImages.myImagesAddOne)
    ;
router.route("/myImages/:myImageId")
    .get(ctrlrMyImages.myImagesGetOne)
    .post(ctrlrMyImages.myImagesAddOne)
    .put(ctrlrMyImages.myImagesUpdOne)
    .delete(ctrlrMyImages.myImagesDelOne)
    ;

// exports
module.exports = router;
