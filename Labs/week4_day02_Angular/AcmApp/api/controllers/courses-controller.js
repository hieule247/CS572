var mongoose = require("mongoose");
var Course = mongoose.model("Course");

// getAll
module.exports.coursesGetAll = function(req, res){
    // 0.
    var funcName = "coursesGetAll";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters: none
    // 3. Main
    Course.find().exec(function(err, courses){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= courses;
        }
        // 3.9: Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// getOne
module.exports.coursesGetOne = function(req, res){
    // 0.
    var funcName = "coursesGetOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var courseId = req.params.courseId;
    // 3. Main
    Course.findById(courseId).exec(function(err, course){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!course){
            response.status = 404; // not found
            response.message= "Not found ID: " + courseId;
        } else {
            response.status = 200; // ok
            response.message= course;
        }
        // 3.9: Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// delOne
module.exports.coursesDelOne = function(req, res){
    // 0.
    var funcName = "coursesDelOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var courseId = req.params.courseId;
    // 3. Main
    Course.findByIdAndRemove(courseId).exec(function(err, course){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!course){
            response.status = 404; // not found
            response.message= "Not found ID: " + courseId;
        } else {
            response.status = 200; // ok
            response.message= "Deleted id: " + courseId;
        }
        // 3.9: Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// updOne
function _updOneCourse(req, res, course){
    // 0.
    var funcName = "_updOneCourse";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    course.name = req.body.name;
    course.notes= req.body.notes;
    // 3. Main
    course.save(function(err, updCourse){
        if (err) {
            response.status = 500; // Server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= updCourse;
        }
        // 3.9 Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

module.exports.coursesUpdOne = function(req, res){
    // 0.
    var funcName = "coursesUpdOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var courseId = req.params.courseId;
    // 3. Main
    Course.findById(courseId).exec(function(err, course){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!course){
            response.status = 404; // not found
            response.message= "Not found ID: " + courseId;
        } 
        // Had Error --> return
        if (response.status !== 0){
            // 3.9: Done with error
            console.log(response.message);
            res.status(response.status).json(response.message);
            // log end
            console.log("End function...api/controller...", funcName);
            return;
        }
        // No error --> Do next step
        _updOneCourse(req, res, course);
    });
}

// addOne
module.exports.coursesAddOne = function(req, res){
    // 0.
    var funcName = "coursesAddOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    // 3. Main
    Course.create({
        name: req.body.name,
        notes: req.body.notes
        }, function (err, course){
            if (err){
                response.status = 500; // server error
                response.message= err;
            } else {
                response.status = 200; // ok
                response.message= course;
            }
            // 3.9 Done
            console.log(response.message);
            res.status(response.status).json(response.message);
        }
    );
    // log end
    console.log("End function...api/controller...", funcName);
}
