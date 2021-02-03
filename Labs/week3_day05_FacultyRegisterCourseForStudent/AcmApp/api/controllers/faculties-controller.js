var mongoose = require("mongoose");
var Faculty = mongoose.model("Faculty");

// getAll
module.exports.facultiesGetAll = function(req, res){
    // 0.
    var funcName = "facultiesGetAll";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters: none
    // 3. Main
    Faculty.find().exec(function(err, faculties){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= faculties;
        }
        // 3.9: Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// getOne
module.exports.facultiesGetOne = function(req, res){
    // 0.
    var funcName = "facultiesGetOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var facultyId = req.params.facultyId;
    // 3. Main
    Faculty.findById(facultyId).exec(function(err, faculty){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!faculty){
            response.status = 404; // not found
            response.message= "Not found ID: " + facultyId;
        } else {
            response.status = 200; // ok
            response.message= faculty;
        }
        // 3.9: Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// delOne
module.exports.facultiesDelOne = function(req, res){
    // 0.
    var funcName = "facultiesDelOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var facultyId = req.params.facultyId;
    // 3. Main
    Faculty.findByIdAndRemove(facultyId).exec(function(err, faculty){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!faculty){
            response.status = 404; // not found
            response.message= "Not found ID: " + facultyId;
        } else {
            response.status = 200; // ok
            response.message= "Deleted id: " + facultyId;
        }
        // 3.9: Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// updOne
function _updOneFaculty(req, res, faculty){
    // 0.
    var funcName = "_updOneFaculty";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    faculty.name = req.body.name;
    faculty.course = req.body.course;
    faculty.username = req.body.username;
    faculty.password = req.body.password;
    // 3. Main
    faculty.save(function(err, updFaculty){
        if (err) {
            response.status = 500; // Server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= updFaculty;
        }
        // 3.9 Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

module.exports.facultiesUpdOne = function(req, res){
    // 0.
    var funcName = "facultiesUpdOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var facultyId = req.params.facultyId;
    // 3. Main
    Faculty.findById(facultyId).exec(function(err, faculty){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!faculty){
            response.status = 404; // not found
            response.message= "Not found ID: " + facultyId;
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
        _updOneFaculty(req, res, faculty);
    });
}

// addOne
module.exports.facultiesAddOne = function(req, res){
    // 0.
    var funcName = "facultiesAddOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    // 3. Main
    Faculty.create({
        name: req.body.name,
        course: req.body.course,
        username: req.body.username,
        password: req.body.password
        }, function (err, faculty){
            if (err){
                response.status = 500; // server error
                response.message= err;
            } else {
                response.status = 200; // ok
                response.message= faculty;
            }
            // 3.9 Done
            console.log(response.message);
            res.status(response.status).json(response.message);
        }
    );
    // log end
    console.log("End function...api/controller...", funcName);
}
