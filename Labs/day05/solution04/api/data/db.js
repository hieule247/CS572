// include
var mongoose = require("mongoose");
require("./students-model.js");

// Global variables
var dbUrl = "mongodb://localhost:27017/SchoolDB";
// ------ Build connection to DB
mongoose.connect(dbUrl);
mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to " + dbUrl);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error: " + err);
});
// ------ Mongoose handle server event: disconnect, terminate, restart
// disconnect
process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("(SIGINT) Mongoose disconnected by app termination");
        process.exit(0);
    });
});
// terminate
process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("(SIGTERM) Mongoose disconnected by app termination");
        process.exit(0);
    });
});
// restart
process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("(SIGUSR2) Mongoose disconnected by app restart");
        process.kill(process.pid, "SIGUSR2");
    });
});
