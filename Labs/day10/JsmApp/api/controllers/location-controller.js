var express = require("express");
var mongoose= require("mongoose");

var Job = mongoose.model("Job");

// getAll + getAll
module.exports.locationGetAll = function(req, res){
    // 0.
    console.log("..... locationGetAll");
    // 
    var response = {status:0, message: []};
    // 
    var jobId = req.params.jobId;
    // 3. Main
    Job.findById(jobId).select("location").exec(function(err, job){
        if (err){
            response.status = 500; // Server error
            response.message= err;
        } else if (!job) {
            response.status = 404; // not found
            response.message= "Not found Id ...." + jobId;
        } else {
            response.status = 200; // ok
            response.message= job.location ? job.location : [];
        }
        // 3.9: send back
        console.log("...END..... locationGetAll: ", response.message);
        res.status(response.status).json(response.message);
    });
}

// delOne
var _delOneLocation = function(req, res, job){
    // 0.
    console.log("..... _delOneLocation");
    // 
    var response = {status: 0, message: []};
    job.location.remove();
    job.save(function(err, deletedJob){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= "location deleted";
        }
        // 3.9: Done. send back
        console.log("...end ..._delOneLocation", response.message);
        res.status(response.status).json(response.message);        
    });
}

module.exports.locationDelOne = function(req, res){
    // 0.
    console.log("..... locationDelOne");
    // 
    var response = {status:0, message: []};
    // 
    var jobId = req.params.jobId;
    // 3. Main
    Job.findById(jobId).select("location").exec(function(err, job){
        if (err){
            response.status = 500; // Server error
            response.message= err;
        } else if (!job) {
            response.status = 404; // not found
            response.message= "Not found Id ...." + jobId;
        } 
        // Had error: return
        if (response.status !== 0) {
            console.log("...END with error..... locationGetAll: ", response.message);
            res.status(response.status).json(response.message);
            return;
        }
        // No error: do next step
        _delOneLocation(req, res, job);
    });
}

// addOne
var _addOneLocation = function(req, res, job){
    // 0.
    console.log("..... _addOneLocation");
    // 1.
    var response = {status:0, message: []};
    // 2.
    if (!job.location)
        job.location = new Object;

    job.location.address  = req.body.address;
    job.location.street = req.body.street;
    job.location.city = req.body.city;
    job.location.state = req.body.state;
    job.location.zip = req.body.zip;
    // 3. Main
    job.save(function(err, updJob){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= updJob;
        }
        // 3.9: Done. send back
        console.log("...end ..._addOneLocation", response.message);
        res.status(response.status).json(response.message);     
    });
}

module.exports.locationAddOne = function(req, res){
    // 0.
    console.log("..... locationAddOne");
    // 
    var response = {status:0, message: []};
    // 
    var jobId = req.params.jobId;
    // 3. Main
//    Job.find(jobId).select("location").exec(function(err, job){
    Job.findById(jobId).select("location").exec(function(err, job){
        if (err){
            response.status = 500; // Server error
            response.message= err;
        } else if (!job) {
            response.status = 404; // not found
            response.message= "Not found Id ...." + jobId;
        } 
        // Had error: return
        if (response.status !== 0) {
            console.log("...END with error..... locationAddOne: ", response.message);
            res.status(response.status).json(response.message);
            return;
        }
        // No error: do next step
        _addOneLocation(req, res, job);
    });
}

// updOne
var _updOneLocation = function(req, res, job){
    // 0.
    console.log("..... _updOneLocation");
    // 1.
    var response = {status:0, message: []};
    // 2.
    if (!job.location)
        job.location = new Object;

    job.location.address  = req.body.address;
    job.location.street = req.body.street;
    job.location.city = req.body.city;
    job.location.state = req.body.state;
    job.location.zip = req.body.zip;
    // 3. Main
    job.save(function(err, updJob){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= updJob;
        }
        // 3.9: Done. send back
        console.log("...end ..._updOneLocation", response.message);
        res.status(response.status).json(response.message);     
    });
}

module.exports.locationUpdOne = function(req, res){
    // 0.
    console.log("..... locationUpdOne");
    // 
    var response = {status:0, message: []};
    // 
    var jobId = req.params.jobId;
    // 3. Main
//    Job.find(jobId).select("location").exec(function(err, job){
    Job.findById(jobId).select("location").exec(function(err, job){
        if (err){
            response.status = 500; // Server error
            response.message= err;
        } else if (!job) {
            response.status = 404; // not found
            response.message= "Not found Id ...." + jobId;
        } 
        // Had error: return
        if (response.status !== 0) {
            console.log("...END with error..... locationAddOne: ", response.message);
            res.status(response.status).json(response.message);
            return;
        }
        // No error: do next step
        _updOneLocation(req, res, job);
    });
}