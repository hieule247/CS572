var mongoose = require("mongoose");

// Attendance info
var attendanceSchema = new mongoose.Schema({
    attdnDate: Date,
    shift: String, // M: morning, A: afternoon, N: night
    attndtType: Number // 0: not set, 1: in class, 2: online, 3: absent
});

// Student Schema
var studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    status: Number, // 0: de-active, 1: active
    attdnInfo: [attendanceSchema]
});

// Model
mongoose.model("Student", studentSchema, "students");