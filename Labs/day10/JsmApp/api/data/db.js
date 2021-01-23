var mongoose = require("mongoose");
require("./jobs-model.js");

var dbUrl = "mongodb://localhost:27017/JsmDB";
// connect
mongoose.connect(dbUrl);
// connection on
mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to ... ", dbUrl);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected.");
});

mongoose.connection.on("error", function(err){
    console.log("Mongoose connection error ... ", err);
});

// process on
process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconneted by app");
        process.exit(0);
    });
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconneted by app");
        process.exit(0);
    });
});

process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconneted by app and restart");
        process.kill(process.pid, "SIGUSR2");
    });
});

