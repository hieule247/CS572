var mongoose = require("mongoose");
/* 
** ------- RsmDB: 
** Employees(pid, name, gender, dob, status)
** Repairs(pid, machineType, machineCode, customerName, 
    dateReceive, dateReturn, pricePredict, price, status, notes, technicians)
*/

// emplyee schema
var employeeSchema= new mongoose.Schema({
    pid: {
        type: String,
        required: false // true
    },
    name: {
        type: String,
        required: false // true
    },
    gender: String,
    dob: Date,
    status: {
        type: Number, // 0: inactive, 1: active
        "default": 0,
        required: true
    }
});

var repairSchema = new mongoose.Schema({
    pid: {
        type: String,
        required: false // true
    },
    machineType: String,
    machineCode: {
        type: String,
        required: false // true
    },
    customerName: String,
    dateReceive: {
        type: Date,
        "default": Date.now,
        required: false // true
    },
    dateReturn: Date,
    pricePredict: Number,
    price: Number,
    status: {
        type: Number,   //  0: received waiting error checking;
                        //  1: error checked waiting for quotation make
                        //  2: quotation was made... wait contacting customer and response
                        // 31: customer agreed price... change to repair phrase
                            // 310: repairing
                            // 311: error fixed ...wating QC test
                            // 312: QC passed ...
                                // 3120: waiting for payment and return
                                // 3121: payment done...wating for return
                                // 3122: return done... wating for payment
                                // 3129: DONE...OK
                        // 32: customer not agree ... change to return
                            // 320: waiting for return
                            // 329: DONE...no have money 
        "default": 0,
        required: true
    },
    technicians: [employeeSchema],
    notes: String
});
// compile model: Collection in mongoDB is Students
mongoose.model("Repair", repairSchema, "Repairs");



