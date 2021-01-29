var mongoose = require("mongoose");

var Faculty = mongoose.model("Faculty");

// getOne
module.exports.facultyGetOne(function(req, res) {
    // 0.
    var funcName = "facultyGetOne";
    console.log("Start function ...api/controllers...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. 
    // 3. Main
    Faculty.find().exec(function(err, faculty){
        if (err){
            response.status = 500; // server error
            response.message= err;
        } else {
            response.status = 200; // ok
            response.message= faculty;
        }
        // 3.9 Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
});