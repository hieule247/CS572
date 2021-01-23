// include
require("./api/data/db.js");
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var routes = require("./api/routes/index.js");
// local variales
var app = express();
app.set("port", 4000);

// next
app.use(function(req, res, next){
    console.log(req.method, req.url);
    next();
});
// path
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
// body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// routes
app.use("/api", routes);

// Start Server
const server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("Listening to port ...", port);
});




