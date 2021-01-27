// --- authen Step 04/4: Create file userS-controller.js

// declare for using
var mongoose = require("mongoose");
var User = mongoose.model("User");
// --- authen Step 05/...Step05.2.1: declare use encrypt 
var bcrypt = require("bcrypt-nodejs");
// --- authen Step 06/...Step06.2.1: declare use jwt 
var jwt = require("jsonwebtoken");

// All api to access DB users here
// getAll
module.exports.getAll = function(req, res){
    var nameFunc = "getAll";
    // 0. log for debuging
    console.log("api...controller..." + nameFunc);
    // 1. local variable
    var response = {status: 0, message: []}
    // 2. parameters: parse and check
    // 3. MAIN
    User.find().exec(function(err, user){
        if (err){
            response.status = 500; // server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= user;
        }
        // 3.9 Done. send back data
        console.log("end...api...: " + nameFunc + "...", response.message);
        res.status(response.status).json(response.message); 
    });
}

// delOne
module.exports.delOne = function(req, res){
    var nameFunc = "delOne";
    // 0. log for debuging
    console.log("api...controller..." + nameFunc);
    // 1. local variable
    var response = {status: 0, message: []}
    // 2. parameters: parse and check
    var username = req.params.username;
    // 3. MAIN
    User.findOneAndRemove({username: username}).exec(function(err, user){
        if (err){
            response.status = 500; // server error
            response.message= err;
        } else if (!user){
            response.status = 404; // not found
            response.message= "not found..." + username;
        }
        else {
            response.status = 200; // ok
            response.message= user;
        }
        // 3.9 Done. send back data
        console.log("end...api...: " + nameFunc + "...", response.message);
        res.status(response.status).json(response.message); 
    });
}

// register
module.exports.register = function(req, res){
    var nameFunc = "register";
    // 0. log for debuging
    console.log("api...controller..." + nameFunc);
    // 1. local variable
    var response = {status: 0, message: []}
    // 2. parameters: parse and check
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    // --- authen Step 05/...Step05.2.1: modyfi controller for using encrypt 
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // 3. MAIN
    User.create({
        name: name,
        username: username,
        password: password
    }, function(err, user){
        if (err){
            response.status = 500; // server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= user;
        }
        // 3.9: Done - send data back
        console.log("end...api...: " + nameFunc + "...", response.message);
        res.status(response.status).json(response.message); 
    });
}

module.exports.login = function(req, res){
    var nameFunc = "login";
    // 0. log for debuging
    console.log("api...controller..." + nameFunc);
    // 1. local variable
    var response = {status: 0, message: []}
    // 2. parameters: parse and check
    var username = req.body.username;
    var password = req.body.password;
    // 3. MAIN
    User.findOne({username: username}).exec(function(err, user){
        if (err){
            response.status = 500; // server error
            response.message= err;
        } else if (!user){
            response.status = 404; // not found
            response.message= "Not found ..." + username;
        } else if // --- authen Step 05/...Step05.2.1: modyfi controller for using encrypt
        (user && !bcrypt.compareSync(password, user.password)) { 
            response.status = 401; // 
            response.message= "Unauthorize...";
        } else {
            // --- authen Step 06/...Step06.2.2: token create
            var token = jwt.sign({username: user.username}, "cs572", {expiresIn: 3600});
            response.status = 200; // ok
            response.message= {success: true, token: token};
        }
        // 3.9 Done. send back data
        console.log("end...api...: " + nameFunc + "...", response.message);
        res.status(response.status).json(response.message); 
    });
}

// authenticate: check valid token
module.exports.authenticate = function(req, res, next){
    var nameFunc = "login";
    // 0. log for debuging
    console.log("api...controller..." + nameFunc);
    // 1. local variable
    var response = {status: 0, message: []}
    // 2. parameters: parse and check
    var headerExist = req.headers.authorization;
    if (!headerExist){
        response.status = 403;
        response.message= "No token provided";
        // send back and return
        console.log("end...api...: " + nameFunc + "...", response.message);
        res.status(response.status).json(response.message); 
        return; // nothing
    }
    // Exist header
    token = headerExist.split(" ")[1];
    jwt.verify(token, "cs572", function(err, decoded){
        if (err){
            response.status = 401;
            response.message= "Unauthorized";
        } else{
            req.user = decoded.username;
            next();
        }
    });
}

