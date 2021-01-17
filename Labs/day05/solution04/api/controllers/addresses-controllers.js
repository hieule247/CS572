var mongoose = require("mongoose");
var Student = mongoose.model("Student");

// GetAll
module.exports.addressesGetAll = function(req, res) {
    console.log("Addresses: GetAll");
    var studentId = req.params.studentId;
    console.log(studentId);
    Student.findById(studentId).select("addresses").exec(function(err, student){
        // Default response: GET
        var response = {status: 0, message: []};
        // Processing
        if (err) { // 500: // Internal Server Error
            console.log("Internal Server Error: ", err);
            response.status = 500;  
            response.message = err;
        } else if (!student) {
            console.log("Not found...." + studentId);
            response.status = 404; // Not Found
            response.message = {"message": "Student ID not found ..." + studentId};
        } else { // 200: Everything OK
            console.log("....Get All Successful!!!");
            response.status = 200; // GET ---- OK 
            response.message = student.addresses ? student.addresses : [];
        }
        // response send to client
        res.status(response.status).json(response.message);
    });
}
// DeleteAll 
var _deleteAllAddresses = function(req, res, student) {
    console.log("_deleteAllAddresses");
    // deleteAll addresses of student
    // for (var i = 0; i < student.addresses.length; i++)
    //     student.addresses[i].remove();
    // save 
    student.save(function(err, student) {
        var response = {status: 0, message: []};
        if (err) {
            response.status = 500;
            response.message= err;
        } 
        // Final Step: Successful
        if (response.status === 0)
        {
            response.status = 200; // OK
            response.message= {"message": "Successful: delete all address"};
        }
        // send back
        res.status(response.status).json(response.message);
    });
}
module.exports.addressesDeleteAll = function(req, res) {
    console.log("Addresses: DeleteAll");
    var studentId = req.params.studentId;
    Student.findById(studentId).select("addresses").exec(function(err, student){
        var response = {status: 0, message: []};
        // Processing
        if (err) { // 500: Internal Server Error
            response.status = 500;  
            response.message = err;
        } else if (!student){ // 404: Not found
            response.status = 404;
            response.message = {"message": "Student ID not found ..." + studentId};
        } 
        // Had error
        if (response.status !== 0) {
            res.status(response.status).json(response.message);
            console.log("Error: " + response.status + " --- " + response.message);
            return;
        }
        // Do Next step
        _deleteAllAddresses(req, res, student);
    });
}

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


// DeleteOne
var _deleteOneAddress = function(req, res, student, addressId) {
    console.log("_deleteOneAddress");
    // get the address
    var address = student.addresses.id(addressId);
    if (!address) {
        res.status(404).json({"error": "Not found address " + addressId});
        return;
    }
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
var _updateOneAddress = function(req, res, student, addressId) {
    console.log("_updateOneAddress");
    // get the address
    var address = student.addresses.id(addressId);
    if (!address) {
        res.status(404).json({"error": "Not found address " + addressId});
        return;
    }
    // update data fields
    address.street = req.body.street;
    address.city   = req.body.city;
    address.state  = req.body.state;
    address.building= req.body.building;
    // save
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
            _updateOneAddress(req, res, student, addressId);
        } else {
            res.status(response.status).json(response.message);            
        } 
    });
}

var _addOneAddress = function(req, res, student) {
    console.log("_addOneAddress");
    // create new address
    const len = student.addresses.length;
    address = new Object;
    // update data fields
    address.street = req.body.street;
    address.city   = req.body.city;
    address.state  = req.body.state;
    address.building= req.body.building;
    // save
    student.addresses[len] = address;
    student.save(function(err, address) {
        var response = {
            status: 200,
            message: []
        }
       if (err) {
            response.status = 500;
            response.message= err;
        } else {
            response.status = 201;
            response.message= student.addresses;
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
            console.log("Error finding student...");
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
