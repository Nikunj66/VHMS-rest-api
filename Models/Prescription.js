const mongoose = require("mongoose");

const { Schema } = mongoose;
const Prescription = mongoose.model(
    "tbl_prescription",
    new Schema({
        patient_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tbl_patient'
        },
        startdate: {
            type: Date,
            default: Date.now()
        },
        days: {
            type: Number
        },
        treatment_description: {
            type: String
        },
        diagnosis_details: {
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
module.exports = Prescription;

module.exports.getPrescriptionList = async (options = {}) => {
    var data = Prescription;
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

module.exports.getPrescriptionByAppointment = async (Appointment) => {
    var prescription = await Prescription.findOne({
        deleted_at: "",
        _id: Appointment.prescription_id,
    });
    return prescription;
}

module.exports.createNewPrescription = async (prescription) => {
    prescription = await Prescription.create(prescription);
    return prescription;
}

module.exports.getPrescriptionById = async (id) => {
    var prescription = await Prescription.findOne({ _id: id, deleted_at: "" });
    return prescription
}

module.exports.updatePrescription = async (olddetails, newdetails) => {
    Object.keys(newdetails).forEach(key => {
        olddetails[key] = newdetails[key];
    });
    olddetails.updated_at = Date.now();
    newdetails = await olddetails.save();
    return newdetails
}

module.exports.getPrescription = async (filter) => {
    var prescription = await Prescription.findOne(filter);
    return prescription;
}