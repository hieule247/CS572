// declare using mongoose
require("./api/data/db.js");

var express = require("express");
var path = require("path");
var routes = require("./api/routes");
var bodyParser = require("body-parser");
require("./api/data/dbconnection").openConnection();


const app = express();
app.set("port", 3000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({extended : false}));

app.use("/api", routes);

const server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("Listening to port " + port);
});
