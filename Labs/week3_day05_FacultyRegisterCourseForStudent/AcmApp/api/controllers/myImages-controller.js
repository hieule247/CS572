var mongoose = require("mongoose");
var MyImage = mongoose.model("MyImage");

var fs = require("fs");
var imgPath = "../data/myImages";
// getAll
module.exports.myImagesGetAll = function(req, res){
    // // 0.
    // var funcName = "myImagesGetAll";
    // console.log("Start function...api/controller...", funcName);
    // // 1.
    // var response = {status: 0, message: []};
    // // 2. parameters: none
    // // 3. Main
    // Course.find().exec(function(err, courses){
    //     if (err) {
    //         response.status = 500; // server error
    //         response.message= err;
    //     } else {
    //         response.status = 200; // ok
    //         response.message= courses;
    //     }
    //     // 3.9: Done
    //     console.log(response.message);
    //     res.status(response.status).json(response.message);
    // });
    // // log end
    // console.log("End function...api/controller...", funcName);
}

// getOne
module.exports.myImagesGetOne = function(req, res){
    // 0.
    var funcName = "myImagesGetOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters
    var myImageId = req.params.myImageId;
    // 3. Main
    MyImage.findById(myImageId).exec(function(err, myImage){
        if (err) {
            response.status = 500; // server error
            response.message= err;
        } else if (!course){
            response.status = 404; // not found
            response.message= "Not found ID: " + myImageId;
        } else {
            response.status = 200; // ok
            response.message= myImage;
        }
        // 3.9: Done
        console.log(response.message);
        res.status(response.status).json(response.message);
    });
    // log end
    console.log("End function...api/controller...", funcName);
}

// delOne
module.exports.myImagesDelOne = function(req, res){
    // // 0.
    // var funcName = "myImagesDelOne";
    // console.log("Start function...api/controller...", funcName);
    // // 1.
    // var response = {status: 0, message: []};
    // // 2. parameters
    // var courseId = req.params.courseId;
    // // 3. Main
    // Course.findByIdAndRemove(courseId).exec(function(err, course){
    //     if (err) {
    //         response.status = 500; // server error
    //         response.message= err;
    //     } else if (!course){
    //         response.status = 404; // not found
    //         response.message= "Not found ID: " + courseId;
    //     } else {
    //         response.status = 200; // ok
    //         response.message= "Deleted id: " + courseId;
    //     }
    //     // 3.9: Done
    //     console.log(response.message);
    //     res.status(response.status).json(response.message);
    // });
    // // log end
    // console.log("End function...api/controller...", funcName);
}

// updOne
function _updOneMyImage(req, res, course){
    // // 0.
    // var funcName = "_updOneMyImage";
    // console.log("Start function...api/controller...", funcName);
    // // 1.
    // var response = {status: 0, message: []};
    // // 2. parameters
    // course.name = req.body.name;
    // course.notes= req.body.notes;
    // // 3. Main
    // course.save(function(err, updCourse){
    //     if (err) {
    //         response.status = 500; // Server error
    //         response.message= err;
    //     } else {
    //         response.status = 200; // ok
    //         response.message= updCourse;
    //     }
    //     // 3.9 Done
    //     console.log(response.message);
    //     res.status(response.status).json(response.message);
    // });
    // // log end
    // console.log("End function...api/controller...", funcName);
}

module.exports.myImagesUpdOne = function(req, res){
    // // 0.
    // var funcName = "myImagesUpdOne";
    // console.log("Start function...api/controller...", funcName);
    // // 1.
    // var response = {status: 0, message: []};
    // // 2. parameters
    // var courseId = req.params.courseId;
    // // 3. Main
    // Course.findById(courseId).exec(function(err, course){
    //     if (err) {
    //         response.status = 500; // server error
    //         response.message= err;
    //     } else if (!course){
    //         response.status = 404; // not found
    //         response.message= "Not found ID: " + courseId;
    //     } 
    //     // Had Error --> return
    //     if (response.status !== 0){
    //         // 3.9: Done with error
    //         console.log(response.message);
    //         res.status(response.status).json(response.message);
    //         // log end
    //         console.log("End function...api/controller...", funcName);
    //         return;
    //     }
    //     // No error --> Do next step
    //     _updOneCourse(req, res, course);
    // });
}

// addOne
module.exports.myImagesAddOne = function(req, res){
    // 0.
    var funcName = "myImagesAddOne";
    console.log("Start function...api/controller...", funcName);
    // 1.
    var response = {status: 0, message: []};
    // 2. parameters

// // using for debuging    
console.log("======== body: ", req.body);
// var tmp = new MyImage;
// tmp.name= req.body.name; console.log("name: ", req.body.name);
// tmp.desc= req.body.desc; console.log("desc: ", req.body.desc);
// // tmp.data= req.body.data; console.log("data: ", req.body.data);
// // tmp.data.file = req.body.fileData; console.log("data: ", req.body.fileData);
// console.log("data: ", req.body.data.value);
// tmp.contenType= req.body.contenType; console.log("contentType: ", req.body.contenType);
// console.log(tmp);

    // 3. Main
    MyImage.create({
        name: req.body.name,
        desc: req.body.desc,
        data: req.body.data,
        contenType: req.body.contenType
        }, function (err, myImage){
            if (err){
                response.status = 500; // server error
                response.message= err;
            } else {
                response.status = 200; // ok
                response.message= myImage;
            }
            // 3.9 Done
            console.log(response.message);
            res.status(response.status).json(response.message);
        }
    );
    // log end
    console.log("End function...api/controller...", funcName);
}
