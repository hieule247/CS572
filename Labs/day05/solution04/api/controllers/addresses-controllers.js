var mongoose = require("mongoose");
var Student = mongoose.model("Student");

// // ---- Address: getAll 
// module.exports.addressesGetAll = function(req, res) {
//     console.log("Get all Address");
//     var studentId = req.params.studentId;
//     console.log(studentId);
//     Student.findById(studentId).select("addresses").exec(function(err, docs){
//         // Processing
//         if (err) {
//             console.log("Error finding address");
//             res.status(500).json(err);
//             return;
//         } 
//         console.log("Get all address for the Student: OK ");
//         // response send to client
//         res.status(200).json(docs.addresses);
//     });
// }

// ---- Address: getOne 
module.exports.addressesGetOne = function(req, res) {
    console.log("Get one Address");
    var studentId = req.params.studentId;
    var addressId = req.params.addressId;
    
    console.log("GET addressId " + addressId + " for StudentId " + studentId);
    Student.findById(studentId).select("addresses").exec(function(err, docs){       
        // Processing
        if (err) {
            console.log("Error finding address");
            res.status(500).json(err);
            return;
        }
        console.log("Get address for the Student: OK");
        // response send to client
        var address = docs.addresses.id(addressId); 
        res.status(200).json(address);
    });
}

// GetAll
module.exports.addressesGetAll = function(req, res) {
    console.log("Addresses: GetAll");
    var studentId = req.params.studentId;
    console.log(studentId);
    Student.findById(studentId).select("addresses").exec(function(err, student){
        var response = {
            status: 200,
            message: []
        }
        // Processing
        if (err) {
            strLog = "Error finding student";
            response.status = 500;  
            response.message = err;
        } else if (!student){
            strLog = "Student ID not found: ", studentId;
            response.status = 404;
            response.message = {"message": "Student ID not found " + studentId};
        } else {
            response.message = student.addresses ? student.addresses : [];
        }
        console.log("Get addresses....OK");
        // response send to client
        res.status(response.status).json(response.message);
    });
}

// module.exports.addressesGetOne = function(req, res) {
//     console.log("Addreses: GetOne");
//     var studentId = req.params.studentId;
//     var addressId = req.params.addressId;
//     console.log("Get address Id " + addressId + ", for student Id " + studentId);
//     Student.findById(studentId).select("addresses").exec(function(err, student){
//             var response = {
//             status: 200,
//             message: []
//         }
//         // Processing
//         if (err) {
//             strLog = "Error finding student";
//             response.status = 500;  
//             response.message = err;
//         } else if (!student){
//             strLog = "Student ID not found: ", studentId;
//             response.status = 404;
//             response.message = {"message": "Student ID not found" + studentId};
//         } else {
//             response.message = student.addresses.id(addressId);
//         }
//         console.log("Get addresses....OK...", response.message);
//         // response send to client
//         res.status(response.status).json(response.message);
//     });
// }

// DeleteOne
var _deleteOneAddress = function(req, res, student, addressId) {
    console.log("_deleteOneAddress");
    // update data fields
    student.addresses.id(addressId).remove();
    student.save(function(err, student) {
        var response = {
            status: 204,
            message: "Deleted One Student."
        }
       if (err) {
            response.status = 500;
            response.message= err;
        } 
        // send back
        res.status(response.status).json(response.message);
    });
}

module.exports.addressesDeleteOne = function(req, res){
    console.log("Addresses: Delete One");
    var studentId = req.params.studentId;
    var addressId = req.params.addressId;
    console.log("Delete address Id " + addressId + ", of student Id " + studentId);

    Student.findById(studentId).select("addresses").exec(function(err, student){
        var response = {
            status: 204,
            message: []
        };
        // error
        if (err) {
            console.log("Error finding student.");
            response.status = 500;
            response.message= err;
        } else if (!student){
            console.log("Student ID not found", studentId);
            response.status = 404;
            response.message= {"message": "Student ID not found: " + studentId};
        }
        // Some things went wrong
        if (student) {
            _deleteOneAddress(req, res, student, addressId);
        } else {
            res.status(response.status).json(response.message);            
        } 
    });
}

// --------- UpdateOne
var _updateOneAddess = function(req, res, student, addressId) {
    console.log("_updateOneAddress");
    // update data fields
//    student.addresses.id(addressId).name = req.body.name;
    student.save(function(err, updatedStudent) {
        var response = {
            status: 204,
            message: "Update succesful!"
        }
       if (err) {
            response.status = 500;
            response.message= err;
        } 
        // send back
        res.status(response.status).json(response.message);
    });
}

module.exports.addressesUpdateOne = function(req, res){
    console.log("Addresses: UpdateOne");
    var studentId = req.params.studentId;
    var addressId = req.params.addressId;
    console.log("Update address Id " + addressId + ", of student Id " + studentId);

    Student.findById(addressId).select("addresses").exec(function(err, student){
        var response = {
            status: 200,
            message: []
        };
        // error
        if (err) {
            console.log("Error finding student.");
            response.status = 500;
            response.message= err;
        } else if (!student){
            console.log("Student ID not found", studentId);
            response.status = 404;
            response.message= {"message": "Student ID not found: " + studentId};
        }
        // Some things went wrong
        if (student) {
            _updateOneAddress(req, res, student, studentId);
        } else {
            res.status(response.status).json(response.message);            
        } 
    });
}

var _addOneAddress = function(req, res, student) {
    console.log("_addOneAddress");
    // update data fields
    // student.addreses.id(addressId).name = req.body.name;
    student.save(function(err, updateStudent) {
        var response = {
            status: 200,
            message: []
        }
       if (err) {
            response.status = 500;
            response.message= err;
        } else {
            response.status = 201;
            response.message= updatedStudent.addresses;
        } 
        // send back
        res.status(response.status).json(response.message);
    });
}

module.exports.addressesAddOne = function(req, res){
    console.log("Address: AddOne");
    var studentId = req.params.studentId;
    console.log("Add address for student Id " + studentId);

    Student.findById(studentId).select("addresses").exec(function(err, student){
        var response = {
            status: 200,
            message: []
        };
        // error
        if (err) {
            console.log("Error finding student.");
            response.status = 500;
            response.message= err;
        } else if (!student){
            console.log("Student ID not found", studentId);
            response.status = 404;
            response.message= {"message": "Student ID not found: " + studentId};
        }
        // Some things went wrong
        if (student) {
            _addOneAddress(req, res, student);
        } else {
            res.status(response.status).json(response.message);            
        } 
    });
}
