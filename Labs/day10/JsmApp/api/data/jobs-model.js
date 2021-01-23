var mongoose = require("mongoose");

// locationSchema: address, street, city, state, zip
var locationSchema = new mongoose.Schema({
    address: {
        type: String
    }, 
    street: {
        type: String
    }, 
    city: {
        type: String
    }, 
    state: {
        type: String
    }, 
    zip: {
        type: String
    }
});
// jobSchema: {title, salary, description, experience, postDate, skills, location}
// db.jobs.insert([{title: "title", salary: "salary", description: "description", experience: "experience", postDate: "1/1/2021", skills:[], location:{}},
// {title: "title", salary: "salary", description: "description", experience: "experience", postDate: "1/1/2021", skills:[], location:{}}]);

var jobSchema = new mongoose.Schema({
    title: {
        type: String
    }, 
    salary: {
        type: Number,
        min: 0
    }, 
    description: {
        type: String
    }, 
    experience: {
        type: String
    }, 
    postDate: {
        type: Date
    }, 
    skills: {
        type: [String]
    }, 
    location: {
        type: locationSchema
    }
});

// Model: using
mongoose.model("Job", jobSchema, "jobs");