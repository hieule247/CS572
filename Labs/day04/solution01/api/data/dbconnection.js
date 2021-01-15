var MongoClient = require("mongodb").MongoClient;
const dbName = "meanGames";
const dburl = "mongodb://localhost:27017/" + dbName;
var _connection = null;

var open = function() {
    MongoClient.connect(dburl, {useUnifiedTopology: true}, function(err, client){
        if (err) {
            console.log("DB connection failed");
            return;
        }
        _connection = client.db(dbName);
        console.log("DB connection open", _connection );
    });
}

var get = function() {
    return _connection;
}

module.exports = {
    openConnection : open,
    get : get
}