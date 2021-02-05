// declare using mongoose
require("./api/data/db.js");
var express = require("express");
var path = require("path");
var routes = require("./api/routes");
var bodyParser = require("body-parser");

const app = express();
app.set("port", 3000);

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// define trust angular localhost: CORS fix 
// Search info at: enbale CORS header: 
// https://www.w3.org/wiki/CORS_Enabled
app.use("/api", function(req, res, next){
    // req.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    console.log("Trusted...", req.method, req.url);
    next();
});

app.use("/api", routes);

const server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("Listening to port ..." + port);
});
