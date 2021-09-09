const mongoose = require("mongoose");

const { Schema } = mongoose;
const MedicineAssign = mongoose.model(
    "tbl_medicine_assign",
    new Schema({
        prescription_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tbl_prescription'
        },
        medicine_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tbl_medicine'
        },
        appointment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tbl_appointment'
        },
        fraction_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tbl_fraction'
        },
        supportive: {
            type: String
        },
        is_active: {
            type: Boolean,
            default: true
        },
        deleted_at: {
            type: Date
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId
        },
        updated_by: {
            type: mongoose.Schema.Types.ObjectId
        },
        deleted_by: {
            type: mongoose.Schema.Types.ObjectId
        }
    }, { timestamps: true })
);
module.exports = MedicineAssign;

module.exports.getMedicineAssignList = async (options = {}) => {
    var data = MedicineAssign;
    if (options) {
        data = data.find();
    }
    if (options.filter) {
        data = data.find(options.filter);
    }
    if (options.like) {
        data = data.find(generateLikeObject(options.like));
    }
    if (options.sorting) {
        data = data.sort(options.sorting);
    }
    return data;
}

module.exports.createNewMedicineAssign = async (medicineassign) => {
    medicineassign = await MedicineAssign.create(medicineassign);
    return medicineassign;
}

module.exports.getMedicineAssignById = async (id) => {
    var medicineassign = await MedicineAssign.findOne({ _id: id, deleted_at: "" });
    return medicineassign
}

module.exports.updateMedicineAssign = async (olddetails, newdetails) => {
    Object.keys(newdetails).forEach(key => {
        olddetails[key] = newdetails[key];
    });
    olddetails.updated_at = Date.now();
    newdetails = await olddetails.save();
    return newdetails
}

module.exports.getMedicineAssign = async (filter) => {
    var medicineassign = await MedicineAssign.findOne(filter);
    return medicineassign;
}