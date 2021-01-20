var mongoose = require("mongoose");
var Repair = mongoose.model("Repair");

// GetAll
module.exports.repairsGetAll = function(req, res){
    // 0. log: for debuging
    console.log("..... getAll");
    // 1. Declare variables
    var offset = 0;
    var count = 10;
    const maxCount = 30;
    // response: Using for send back data to client
    var response = {status: 0, message: []};
    // 2. Parameters: Parse and check
    // Parse: query string
    if (req.query) {
        // offset: if not set default
        offset = (req.query.offset) ? parseInt(req.query.offset) : offset;
        // count: if not set default
        count = (req.query.count) ? parseInt(req.query.count) : count;
    }
    // check validate for count && offset
    console.log("Count is: ", count);
    if (isNaN(offset) || isNaN(count)){
        response.status = 400; // bad request
        response.message= "offset and count in QueryString should be numbers.";
        // send back to client
        res.status(response.status).json(response.message);
        return;
    }
    // check maxCount
    if (count > maxCount){
        response.status = 400;
        response.message= "Cannot exeed count of " + maxCount;
        // send back to client
        res.status(response.status).json(response.message);
        return;
    }
    // 3. MAIN: Processing get data base on offset and count
    Repair.find().skip(offset).limit(count).exec(function(err, docs){
        if (err){ // 500: Server check
            response.status = 500; // Internal sever error
            response.message= err;
            console.log("Internal server error:...", err); 
        } else { // 200: OK
            response.status = 200; // OK
            response.message= docs;
            console.log("Found...: ", docs.length);
        }
        // 3.9. DONE: send back to client
        res.status(response.status).json(response.message); 
    });
}

// GetOne
module.exports.repairsGetOne = function(req, res) {
    // 0. log: for debuging
    console.log("..... getOne");
    // 1. declare variables
    // response: Using for send back data to client
    var response = {status: 0, message: []};
    // 2. Parameters: Parse and Check
    // Parse parameters
    var repairId = req.params.repairId;
    // 3. MAIN: GetById
    Repair.findById(repairId).exec(function(err, doc){
        if (err){ // 500: Server check
            response.status = 500;
            response.message= err;
            console.log("Internal server error: ...", err);
        } else if (!doc) { // 404: Existed check 
            response.status = 404;
            response.message= "Not found ID: " + repairId;
            console.log("Not found ID: ", repairId);
        } else { // 200: OK
            response.status = 200; // OK
            response.message= doc;
        }
        // 3.9: Send back to client
        res.status(response.status).json(response.message);     
    });
}

// AddOne
module.exports.repairsAddOne = function(req, res){
    // 0. log for debuging
    console.log("..... addOne");
    // 1. declare variables
    var response = {status: 0, message: []};
    // 2. parameters: Parse and check
    var repairId = req.params.repairId;
    if (!req.body){ // 400: bad request
        response.status = 400;
        response.message= "POST body: Data missing.";
        console.log("POST body: data missing...");
        // send back to client
        res.status(response.status).json(response.message);
        return;
    }
    // 3. MAIN
    Repair.create({
        pid: req.body.pid, 
        machineType: req.body.machineType, 
        machineCode: req.body.machineCode, 
        customerName: req.body.customerName, 
        dateReceive: req.body.dateReceive, 
        dateReturn: req.body.dateReturn, 
        pricePredict: parseFloat(req.body.pricePredict), 
        price: parseFloat(req.body.price), 
        status: parseInt(req.body.status), 
        notes: req.body.notes},
        function(err, doc){
            if (err){ // 400: bad request
                response.status = 400;
                response.message= err;
            } else { // 201: Created
                response.status = 201;
                response.message= doc;
            }
            // 3.9: Send back to client
            res.status(response.status).json(response.message);  
        }
    );
}

// UpdateOne
var _updOneRepair = function (req, res, repair) {
    // 0: log for debudging
    console.log("....._updOneRepair");
    // 1: declare variable
    var response = {status: 0, message: []};
    // 2. parametes: parse and check
    repair.pid = req.body.pid; 
    repair.machineType = req.body.machineType; 
    repair.machineCode = req.body.machineCode; 
    repair.customerName= req.body.customerName, 
    repair.dateReceive = req.body.dateReceive; 
    repair.dateReturn = req.body.dateReturn; 
    repair.pricePredict = parseFloat(req.body.pricePredict); 
    repair.price = parseFloat(req.body.price); 
    repair.status =  parseInt(req.body.status); 
    repair.notes = req.body.notes;
    // 3. MAIN
    repair.save(function(err, updRepair){
        if (err) { // 500: Error at server
            response.status = 500;
            response.message= err;
        }
        else { // 200: update OK
            response.status = 200; // OK
            response.message= updRepair;
        }
        // 3.9: DONE: send back to client
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
}

module.exports.repairsUpdOne = function(req, res){
    // 0. log for debuging
    console.log("..... UpdateOne");
    // 1. declare variables
    var response = {status: 0, message: []};
    // 2. parameters: parse and check
    var repairId = req.params.repairId;
    // 3. MAIN
    Repair.findById(repairId).exec(function(err, doc){
        if (err) { // 500: server error
            response.status = 500;
            response.message= err;
        } else if (!doc){
            response.status = 404; // Not found
            response.message= "Not found ID: " + repairId;
        }
        // Had error--> return
        if (response.status !== 0) {
            console.log("Error: " + response.status + " --- " + response.message);
            res.status(response.status).json(response.message);
            return;
        }
        // Good: theItem = doc --> do next step
        _updOneRepair(req, res, doc);
    });
};

// DeleteOne
module.exports.repairsDelOne = function(req, res) {
    // 0: log for debuging
    console.log("..... DelOne");
    // 1: declare variables
    var response = {status: 0, message: []};
    // 2: parameters: parse and check
    var repairId = req.params.repairId;
    // 3: MAIN
    Repair.findByIdAndRemove(repairId).exec(function(err, delItem){
        if (err){ // 500: server error
            response.status = 500;
            response.message= err;
        } else if (!delItem){ // 404: Not found
            response.status = 404; // Not found
            response.message= "Not found ID: " + repairId;
        } else { // 200: OK 
            response.status = 200;
            response.message= "Deleted ID: " + repairId; 
        }
        // 3.9: DONE: send back to client
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
}