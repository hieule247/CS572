var mongoose = require("mongoose");
var Student = mongoose.model("Student");

// getAll
module.exports.studentsGetAll = function(req, res){
    // 0.
    var funcName = "studentGetAll";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters: none
    // 3. Main
    Student.find().exec(function(err, students){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= students;
        }
        // 3.9: Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// getOne
module.exports.studentsGetOne = function(req, res){
    // 0.
    var funcName = "studentGetOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var studentId = req.params.studentId;
    // 3. Main
    Student.findById(studentId).exec(function(err, student){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!student){
            response.status = 404; // not found
            response.message= "Not found ID: " + studentId;
        } else {
            response.status = 200; // ok
            response.message= student;
        }
        // 3.9: Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// delOne
module.exports.studentsDelOne = function(req, res){
    // 0.
    var funcName = "studentDelOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var studentId = req.params.studentId;
    // 3. Main
    Student.findByIdAndRemove(studentId).exec(function(err, student){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!student){
            response.status = 404; // not found
            response.message= "Not found ID: " + studentId;
        } else {
            response.status = 200; // ok
            response.message= "Deleted id: " + studentId;
        }
        // 3.9: Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// updOne
function _updOneStudent(req, res, student){
    // 0.
    var funcName = "_updOneStudent";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    student.studentId = req.body.studentId;
    student.firstName = req.body.firstName;
    student.lastName = req.body.lastName;
    student.username = req.body.username;
    student.password = req.body.password;
    student.status = 0; // parseInt(req.body.status, 10);
    // 3. Main
    student.save(function(err, updStudent){
        if (err) {
            response.status = 500; // Server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= updStudent;
        }
        // 3.9 Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

module.exports.studentsUpdOne = function(req, res){
    // 0.
    var funcName = "studentUpdOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var studentId = req.params.studentId;
    // 3. Main
    Student.findById(studentId).exec(function(err, student){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!student){
            response.status = 404; // not found
            response.message= "Not found ID: " + studentId;
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
        _updOneStudent(req, res, student);
    });
}

// addOne
module.exports.studentsAddOne = function(req, res){
    // 0.
    var funcName = "studentAddOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    // 3. Main
    Student.create({
        studentId: req.body.studentId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        status: parseInt(req.body.status)
        }, function (err, student){
            if (err){
                response.status = 500; // server error
                response.message= err;
            } else {
                response.status = 200; // ok
                response.message= student;
            }
            // 3.9 Done
            console.log(response.message);
            res.status(response.status).json(response.message);
        }
    );
    // log end
    console.log("End function...api/controller...", funcName);
}
