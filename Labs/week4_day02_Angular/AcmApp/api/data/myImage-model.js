var mongoose = require("mongoose");

// Image Schema
var myImageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img: {
        data: Buffer,
        contentType: String
    }
});


// model
module.exports = mongoose.model("MyImage", myImageSchema, "MyImages");