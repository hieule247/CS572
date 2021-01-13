var express = require("express");
var url = require("url");

var app = express();
app.set("port", 3000);
app.get("/:num1", function (req, res) {
    console.log("GET received.");
    // Get num1 from path Parameter
    var num1;
    if (req.params.num1)
        num1 = parseInt(req.params.num1, 10);
    // Get num2 from Query String
    var num2; // 
    if (req.query && req.query.num2)
        num2 = parseInt(req.query.num2, 10);
    // prinout result
    var strResult = "result: " + num1 + " + " + num2 + " = " + (num1 + num2); 
    console.log(strResult); 
    // send back to client
    res.status(200);
    res.send(strResult); 
});

var server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("Listening to port " + port);
});
