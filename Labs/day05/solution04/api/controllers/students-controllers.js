// using mongoose
var mongoose = require("mongoose");
var Student = mongoose.model("Student");

// ---- Full: checking and hardening 
module.exports.studentsGetAll = function(req, res) {
    console.log("Get all students.");
    console.log(req.query);
    var offset = 0;
    var count = 5;
    const maxCount = 10;

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
            console.log("Error finding games.");
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

// Add One
module.exports.gamesUpdateOne = function(req, res){
    var gameId = req.params.gameId;
    Gamepad.findById(gameId).select
}
