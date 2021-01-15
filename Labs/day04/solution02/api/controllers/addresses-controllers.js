var mongoose = require("mongoose");
var Student = mongoose.model("Student");

// ---- Address: getAll 
module.exports.addressesGetAll = function(req, res) {
    console.log("Get all Address");
    var studentId = req.params.studentId;
    console.log(studentId);
    Student.findById(studentId).select("address").exec(function(err, docs){
        // Processing
        if (err) {
            console.log("Error finding address");
            res.status(500).json(err);
            return;
        } 
        console.log("Get all address for the Student: OK ");
        // response send to client
        res.status(200).json(docs.address);
    });
}

// ---- Address: getOne 
module.exports.addressesGetOne = function(req, res) {
    console.log("Get one Address");
    var studentId = req.params.studentId;
    var addressId = req.params.addressId;
    
    console.log("GET addressId " + addressId + " for StudentId " + studentId);
    Student.findById(studentId).select("address").exec(function(err, docs){       
        // Processing
        if (err) {
            console.log("Error finding address");
            res.status(500).json(err);
            return;
        }
        console.log("Get address for the Student: OK");
        // response send to client
        var address = docs.address.id(addressId); 
        res.status(200).json(address);
    });
}
