var mongoose = require("mongoose");

var Student = mongoose.model("Student");

// getAll
module.exports.attendsGetAll = function(req, res){
    // 0.
    var funcName = "attendGetAll";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters: none
    var studentId = req.params.studentId;
    // 3. Main
    Student.findById(studentId).select("attends").exec(function(err, student){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!student){
            response.status = 404; // not found
            response.message= "Not found ID: " + studentId;
        } else {
            response.status = 200; // ok
            response.message= student.attends ? student.attends : []; 
        }
        // 3.9: Done. send back data
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// getOne
function _getOneAttend(req, res, student, attendId){
    // 0.
    var funcName = "_getOneAttend";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    // 3. Main
    var attend = student.attends.id(attendId);
    if (!attend){
        response.status = 404; // not found
        response.message= "Not found ID: " + attendId;
        // 3.9: Done with error
        console.log(response.message);
        res.status(response.status).json(response.message);
        console.log("End function...api/controller...", funcName);
        return;
    } else {
        response.status = 200; // OK
        response.message= attend;
    } 
    // 3.9: Done. send back data
    console.log(response.message);
    res.status(response.status).json(response.message);
    // log end
    console.log("End function...api/controller...", funcName);
};

module.exports.attendsGetOne = function(req, res){
    // 0.
    var funcName = "attendGetOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var studentId = req.params.studentId;
    var attendId = req.params.attendId;
    // 3. Main
    Student.findById(studentId).select("attends").exec(function(err, student){
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
            console.log();
            console.log("End function...api/controller...", funcName);
            return;
        }
        // No error --> Do next step
        _getOneAttend(req, res, student, attendId);
    });
}

// delOne
function _delOneAttend(req, res, student, attendId){
    // 0.
    var funcName = "_delOneAttend";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    // 3. Main
    student.attends.id(attendId).remove();
    student.save(function(err, updStudent){
        if (err) {
            response.status = 500; // Server error
            response.message= err;
        } else {
            response.status = 200; // OK
            response.message= updStudent;
        }
        // 3.9: Done. send back data
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
};

module.exports.attendsDelOne = function(req, res){
    // 0.
    var funcName = "attendDelOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var studentId = req.params.studentId;
    var attendId  = req.params.attendId;
    // 3. Main
    Student.findById(studentId).select("attends").exec(function(err, student){
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
            console.log("End function...api/controller...", funcName);
            return;
        }
        // No error --> Do next step
        _delOneAttend(req, res, student, attendId);
    });
}

// updOne
function _updOneAttend(req, res, student, attendId){
    // 0.
    var funcName = "_updOneAttend";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var newAttend = student.attends.id(attendId);
    if (!newAttend){
        res.status(404).json({"error": "the Attendance not found"});
        return;          
    }
    // update data fields
    newAttend.attendDate   = req.body.attendDate;
    newAttend.shift        = req.body.shift;
    newAttend.attendType   = parseInt(req.body.attendType);
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
        console.log("End function...api/controller...", funcName);
    });
}

module.exports.attendsUpdOne = function(req, res){
    // 0.
    var funcName = "attendUpdOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var studentId = req.params.studentId;
    var attendId  = req.params.attendId;
    // 3. Main
    Student.findById(studentId).select("attends").exec(function(err, student){
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
            console.log();
            console.log("End function...api/controller...", funcName);
            return;
        }
        // No error --> Do next step
        _updOneAttend(req, res, student, attendId);
    });
}

// addOne
function _addOneAttend(req, res, student){
    // 0.
    var funcName = "_addOneAttend";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var newAttend = new Object; 
    newAttend.attendDate   = req.body.attendDate;
    newAttend.shift        = req.body.shift;
    newAttend.attendType   = parseInt(req.body.attendType, 10);
    // 3. Main
    student.attends[student.attends.length] = newAttend;
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

module.exports.attendsAddOne = function(req, res){
    // 0.
    var funcName = "attendAddOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var studentId = req.params.studentId;
    var attendId  = req.params.attendId;
    // 3. Main
    Student.findById(studentId).select("attends").exec(function(err, student){
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
            console.log();
            console.log("End function...api/controller...", funcName);
            return;
        }
        // No error --> Do next step
        _addOneAttend(req, res, student);
    });
}
