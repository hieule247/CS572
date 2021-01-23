// include
var express = require("express");
var mongoose= require("mongoose");
require("../data/jobs-model.js");

var Job = mongoose.model("Job");

// GetAll
module.exports.jobsGetAll = function(req, res){
    // 0.
    console.log("controller.....GetAll");
    // 1.
    var response = {status: 0, message: []}
    var offset = 0;
    var count  = 100;
    var maxCount = 1000;
    // 2. parameters
    if (req.query && req.query.count){
        count = praseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        response.status = 400;
        response.message= "invalid: offset or count in query string";
        // send back
        console.log(response.message);
        res.status(response.status).json(response.message);
        return;
    }
    if (count > maxCount) {
        response.status = 400;
        response.message= "Count must be lessthan...", maxCount;
        // send back
        console.log(response.message);
        res.status(response.status).json(response.message);
        return;
    }
    // 3. MAIN
    // Job.find().skip(offset).limit(count).exec(function(err, jobs){    
    Job.find().exec(function(err, jobs){
        if (err){
            response.status = 500; // Server error
            response.message= err;
        } else {
            response.status = 200; // OK
            response.message= jobs;
        }
        // 3.9 Done
        console.log("end getAll....: ", response.message);
        res.status(response.status).json(response.message);
    })
};

// GetOne
module.exports.jobsGetOne = function(req, res){
    // 0.
    console.log("controller.....GetOne");
    // 1.
    var response = {status: 0, message: []}
    // 2. parameters
    var jobId = req.params.jobId;
    // 3. MAIN
    Job.findById(jobId).exec(function(err, job){
        if (err){
            response.status = 500; // Server error
            response.message= err;
        } else if (!job) {
            response.status = 404; // Not found
            response.message= "Not found Id..." + jobId;
        } 
        else {
            response.status = 200; // OK
            response.message= job;
        }
        // 3.9 Done
        console.log("end getOne....: ", response.message);
        res.status(response.status).json(response.message);
    })
};

// DelOne
module.exports.jobsDelOne = function(req, res){
    // 0.
    console.log("controller.....DelOne");
    // 1.
    var response = {status: 0, message: []}
    // 2. parameters
    var jobId = req.params.jobId;
    // 3. MAIN
    Job.findByIdAndRemove(jobId).exec(function(err, job){
        if (err){
            response.status = 500; // Server error
            response.message= err;
        } else if (!job) {
            response.status = 404; // Not found
            response.message= "Not found Id..." + jobId;
        } 
        else {
            response.status = 200; // OK
            response.message= job;
        }
        // 3.9 Done
        console.log("end DelOne....: ", response.message);
        res.status(response.status).json(response.message);
    })
};

// UpdOne
var _updOneJob = function(req, res, job){
    // 0.
    console.log("..... _updOne");
    // 1.
    var response = {status: 0, message: []}
    // 2. parameters
    job.title  = req.body.title;
    job.salary = parseFloat(req.body.salary); 
    job.description = req.body.description; 
    job.experience = req.body.experience; 
    job.postDate = req.body.postDate;
    job.skills = req.body.skills; 
    // 3.MAIN
    job.save(function(err, updJob){
        if (err){
            response.status = 500; // server error
            response.message= err;
        } 
        else {
            response.status = 200; // ok
            response.message= updJob;
        }
        // 3.9: send back data
        console.log("Update successful: ....", response.message);
        res.status(response.status).json(response.message);
    });
}

module.exports.jobsUpdOne = function(req, res){
    // 0.
    console.log("controller.....UpdOne");
    // 1.
    var response = {status: 0, message: []}
    // 2. parameters
    var jobId = req.params.jobId;
    // 3. MAIN
    Job.findById(jobId).exec(function(err, job){
        if (err){
            response.status = 500; // Server error
            response.message= err;
        } else if (!job) {
            response.status = 404; // Not found
            response.message= "Not found Id..." + jobId;
        }
        // Had error ---> return: 3.9 Done
        if (response.status !== 0)
        {
            console.log("end getOne had error....: ", response.message);
            res.status(response.status).json(response.message);
        }
        // Good ---> next step
        _updOneJob(req, res, job);
    })
};

// AddOne
module.exports.jobsAddOne = function(req, res){
    // 0.
    console.log("..... _addOneJob");
    // 1.
    var response = {status: 0, message: []}
    // 2. parameters
    // 3.MAIN
    Job.create({
        title: req.body.title,
        salary: parseFloat(req.body.salary), 
        description: req.body.description,
        experience: req.body.experience, 
        postDate: req.body.postDate,
        skills: req.body.skills 
    }, function(err, job) {
        if (err){
            response.status = 500; // server error
            response.message= err;
        } 
        else {
            response.status = 200; // ok
            response.message= job;
        }
        // 3.9: send back data
        console.log("Update successful: ....", response.message);
        res.status(response.status).json(response.message);
    });
};
