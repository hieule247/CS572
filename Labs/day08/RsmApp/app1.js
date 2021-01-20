// run database config first
require("./api/data/db.js");
// declare library using
var express = require("express"); // npm install express
var path = require("path");
var bodyParser = require("body-parser"); // npm install save body-parser
var routes = require("./api/routes");

// declare app variable
const app = express();
app.set("port", 3000);

// 1. define log request
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
// 2. define static folder
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
// 3. body-parser.urlencode
app.use(bodyParser.urlencoded({extended : false}));
// 4. define midware: routes
app.use("/api", routes);
// step FINAL: Start server
const server = app.listen(app.get("port"), function(){
    var port = server.address().port;
    console.log("... Listening to port " + port);
});
