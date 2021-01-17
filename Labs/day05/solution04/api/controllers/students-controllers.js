// using mongoose
var mongoose = require("mongoose");
var Student = mongoose.model("Student");

// ---- Full: checking and hardening 
module.exports.studentsGetAll = function(req, res) {
    console.log("Get all students.");
    console.log(req.query);
    var offset = 0;
    var count = 100;
    const maxCount = 100;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    // ----- check validate
    console.log("Count is: ", count);
    if (isNaN(offset) || isNaN(count)){
        res.status(400).json({"message": "offset and count in QueryString should be numbers." });
        return;
    }

    if (count > maxCount) {
        res.status(400).json({"message": "Cannot exceed count of " + maxCount});
        return;
    }
    // using Mongoose
    Student.find().skip(offset).limit(count).exec(function(err, docs) {
        // Is Error        
        if (err) {
            console.log("Error finding students.");
            res.status(500).json(err);
        } else {
            console.log("Found students: ", docs.length);
            res.status(200).json(docs);
        }
    });
};

module.exports.studentsGetOne = function(req, res) {
    console.log("Get one");
    var studentId = req.params.studentId;
    console.log(studentId);
    Student.findById(studentId).exec(function(err, student){
        // default response value
        var strLog = "Get student succesful";
        var response = {
            status: 200,
            message: student
        }
        // Processing
        if (err) {
            strLog = "Error finding student";
            response.status = 500;
            response.message = err;
        } else if (!student){
            strLog = "Student ID not found";
            response.status = 404;
            response.message = {"message": "Student ID not found"};
        }
        console.log(strLog);
        // response send to client
        res.status(response.status).json(response.message);
    });
}

// UpdateOne
module.exports.studentsUpdateOne = function(req, res) {
    console.log("PUT: Students UpdateOne");
    var studentId = req.params.studentId;
    console.log(studentId);

    // Student.findById(studentId).select("-addresses").exec(function(err, student){
    Student.findById(studentId).exec(function(err, student){
            var response = {
            status: 204,
            message: student
        };
        // error
        if (err) {
            response.status = 500;
            response.message= err;
        } else if (!student){
            response.status = 404;
            response.message= {"message": "Student ID not found"};
        }
        // Some things went wrong
        if (response.status !== 204) {
            res.status(response.status).json(response.message);            
        } else {
            // We got the student. Now update data
            student.name = req.body.name;
            student.GPA = parseFloat(req.body.GPA);           
            // ---- Save Student
            student.save(function(err, updateStudent) {
                // is error at Server
                if (err) {
                    response.status = 500;
                    response.message= err;
                }
                // send back info to client
                response.message = updateStudent;
                res.status(response.status).json(response.message);
            }) 
        } 
    });
}

// DeleteOne
module.exports.studentsDeleteOne = function(req, res) {
    console.log("DELETE: students DeleteOne");
    var studentId = req.params.studentId;
    console.log(studentId);

    Student.findByIdAndRemove(studentId).exec(function(err, deletedStudent){
        var response = {
            status: 204,
            message: "Student deleted"
        };
        // error
        if (err) {
            response.status = 500;
            response.message= err;
        } else if (!deletedStudent){
            response.status = 404;
            response.message= {"message": "Student ID not found"};
        }
        // Send back to client
        res.status(response.status).json(response.message);    
    });
}

// AddOne
module.exports.studentsAddOne = function(req, res){
    console.log("POST: Student AddOne");
    if (req.body){
        Student.create({
            name: req.body.name,
            GPA: parseFloat(req.body.GPA)
            }, function(err, student){
                var response = {
                    status: 201, 
                    message: student
                };
                // Error check
                if (err){
                    response.status = 400;
                    response.message= err;
                }
                // send back
                res.status(response.status).json(response.message);            
        });
    } else {
        console.log("Data missing from POST body");
        res.status(400).json({error: "Require data missing from POST"});
    }
}
