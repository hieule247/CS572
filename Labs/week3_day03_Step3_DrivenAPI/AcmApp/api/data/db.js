var mongoose = require("mongoose");

var dbUrl = "mongodb://localhost:27017/AcmDB";

// mongoose.connection.on
mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to database...", dbUrl);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected.");
});

mongoose.connection.on("error", function(err){
    console.log("Mongoose error...", err);
});

// process.on
process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log("(SIGINT) Mongoose disconnected by app termination");
        process.exit(0);
    });
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log("(SIGTERM) Mongoose disconnected by app termination");
        process.exit(0);
    });
});

process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log("(SIGUSR2) Mongoose disconnected by app restart");
        process.kill(process.pid, "SIGUSR2");
    });
});

