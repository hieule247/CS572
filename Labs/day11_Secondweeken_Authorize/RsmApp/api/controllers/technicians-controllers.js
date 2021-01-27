var mongoose = require("mongoose");
var Repair = mongoose.model("Repair");

// GetAll
module.exports.techniciansGetAll = function(req, res){
    // 0: log for debuging
    console.log("..... Get All");
    // 1. declare variables
    var response = {status: 0, message: []};
    // 2. parameters: parse and check
    var repairId = req.params.repairId;
    // 3. MAIN
    Repair.findById(repairId).select("technicians").exec(function(err, repair){
        if (err) { // 500: server error
            response.status = 500;
            response.message= err;
        } else if (!repair){ // 404: not found
            response.status = 404; 
            response.message= "Not found ID: " + repairId;
        } else { // 200: OK
            response.status = 200;
            response.message= repair.technicians ? repair.technicians : [];
        }
        // 3.9 DONE: send back to client
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
}

// GetOne
module.exports.techniciansGetOne = function (req, res){
    // 0. log for debuging
    console.log("..... GetOne");
    // 1. declare variables
    var response = {status: 0, message: []};
    // 2. parameters: parse and check
    var repairId    = req.params.repairId;
    var technicianId  = req.params.technicianId;
    // 3. MAIN
    Repair.findById(repairId).select("technicians").exec(function(err, repair){
        if (err){ // 500: server error
            response.status = 500;
            response.message= err;
        } else if (!repair) { // 404: Not found
            response.status = 404;
            response.message= "Not found ID: " + repairId;
        } else { // 200: OK
            response.status = 200;
            response.message = repair.technicians ? repair.technicians.id(technicianId) : [];
        }
        // 3.9: Done. send back to client
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
}

// AddOne
var _addOneTechnician = function(req, res, repair){
    // 0. log for debuging
    console.log("..... _addOne");
    // 1. declare variables
    var response = {status: 0, message: []};
    // 2. parameters: parse and check
    var technician = new Object;
    technician.pid    = req.body.pid;
    technician.name   = req.body.name;
    technician.gender = req.body.gender;
    technician.dob    = req.body.dob;
    technician.status = parseInt(req.body.status);

    // 3. MAIN
    repair.technicians[repair.technicians.length] = technician;
    repair.save(function(err, newItem){
        if (err){ // 500: server error
            response.status = 500;
            response.message= err;
        } else { // 201: Created
            response.status = 201;
            response.message = repair.technicians;
        }
        // 3.9: Done. send back to client
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
}

module.exports.techniciansAddOne = function(req, res){
    // 0. log for debuging
    console.log("..... AddOne");
    // 1. declare variables
    var response = {status: 0, message: []};
    // 2. parameters: parse and check
    var repairId = req.params.repairId;
    // 3. MAIN
    Repair.findById(repairId).select("technicians").exec(function(err, repair){
        if (err){ // 500: Server error
            response.status = 500;
            response.message= err;
        } else if (!repair){ // 404: Not found
            response.status = 404;
            response.message= "Not found ID: " + repairId;
        }
        // Had error: return
        if (response.status !== 0) // had error
        {
            console.log(response.message);
            res.status(response.status).json(response.message);
            return;
        }
        // Good: to next step
        _addOneTechnician(req, res, repair);
    });
}

// UpdateOne
var _updOneTechnician = function(req, res, repair, technicianId){
    // 0. log for debuging
    console.log("..... _updOne");
    // 1. declare variables
    var response = {status: 0, message: []};
    // 2. parameters: parse and check
    var technician = repair.technicians.id(technicianId);
    if (!technician){ // 404 not Found
        response.status = 404;
        response.message= "Not found Id: " + technicianId;
        // send back co client
        console.log(response.message);
        res.status(response.status).json(response.message);
        return;
    }
    // update fields 
    technician.pid    = req.body.pid;
    technician.name   = req.body.name;
    technician.gender = req.body.gender;
    technician.dob    = req.body.dob;
    technician.status = parseInt(req.body.status);
    // 3. MAIN
    repair.save(function(err, updRepair){
        if (err){ // 500: server error
            response.status = 500;
            response.meassge= err;
        } else { // 200: OK
            response.status = 200;
            response.message= technician;
        }
        // 3.9: Done. send back to client
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
}

module.exports.techniciansUpdOne = function(req, res){
    // 0. log for debuging
    console.log("..... UpdOne");
    // 1. declare variables
    var response = {status: 0, message: []};
    // 2. parameters: parse and check
    var repairId = req.params.repairId;
    var technicianId = req.params.technicianId;
    // 3. MAIN
    Repair.findById(repairId).select("technicians").exec(function(err, repair){
        if (err){ // 500: server error
            response.status = 500;
            response.message= err;
        } else if (!repair){ // 404: Not found
            response.status = 404;
            response.message= "Not found ID: " + repairId;
        }
        // Had error: return
        if (response.status !== 0) {
            console.log(response.message);
            res.status(response.status).json(response.message);
            return;
        }
        // Good: Go to next step
        _updOneTechnician(req, res, repair, technicianId)
    });
}

// DeleteOne
var _delOneTechnician = function(req, res, repair, technicianId){
    // 0. log for debuging
    console.log("....._delOne");
    // 1. declare variables
    var response = {status: 0, message: []};
    // 2. parameters: parse and check
    var technician = repair.technicians.id(technicianId);
    if (!technician){ // 404: Not Found
        response.status = 404;
        response.message= "Not found ID: " + technicianId;
        // Send back to client
        console.log(response.messge);
        res.status(response.status).json(response.messsge);
        return;
    }
    // 3. MAIN
    repair.technicians.id(technicianId).remove(function(err, updRepair){
        if (err){ // 500: server error
            response.status = 500;
            response.message= err;
            // send back to client and return
            console.log(response.message);
            res.status(response.status).json(response.messge);
            return;
        }
    });
    repair.save(function(err, updRepair){
        if (err){ // 500: server error
            response.status = 500;
            response.message= err;
        } else { // 200: OK
            response.status = 200;
            response.message= "Deleted ID: " + technicianId;
        }
        // 3.9: Done. Send back to client
        console.log(response.message);
        res.status(response.status).json(response.message);
    });

}

module.exports.techniciansDelOne = function (req, res){
    // 0. log for debuging
    console.log("..... DeleteOne");
    // 1. declare variables
    var response = {status: 0, message: []};
    // 2. parameters: parse and check
    var repairId = req.params.repairId;
    var technicianId = req.params.technicianId;
    // 3. MAIN
    Repair.findById(repairId).select("technicians").exec(function(err, repair){
        if (err){ // 500: server error
            response.status = 500;
            response.message= err;
        } else if (!repair){ // 404: Not found
            response.status = 404;
            response.message= "Not found ID: " + repairId;
        } 
        // Had error: --> return 
        if (response.status !== 0){
            console.log("Error: " + response.status + " --- " + response.message);
            res.status(response.status).json(response.message);
            return;
        }
        // OK: --> Do next step
        _delOneTechnician(req, res, repair, technicianId);
    });
}