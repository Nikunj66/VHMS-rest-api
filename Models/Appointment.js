const mongoose = require("mongoose");

const { Schema } = mongoose;
const Appointment = mongoose.model(
    "tbl_appointment",
    new Schema({
        prescription_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tbl_appointment'
        },
        from_time: {
            type: String
        },
        to_time: {
            type: String,
        },
        staff_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tbl_staff'
        },
        date: {
            type: Date
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
module.exports = Appointment;

module.exports.getAppointmentList = async (options = {}) => {
    var data = Appointment;
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

module.exports.createNewAppointment = async (appointment) => {
    appointment = await Appointment.create(appointment);
    return appointment;
}

module.exports.getAppointmentById = async (id) => {
    var appointment = await Appointment.findOne({ _id: id, deleted_at: "" });
    return appointment
}

module.exports.updateAppointment = async (olddetails, newdetails) => {
    Object.keys(newdetails).forEach(key => {
        olddetails[key] = newdetails[key];
    });
    olddetails.updated_at = Date.now();
    newdetails = await olddetails.save();
    return newdetails
}

module.exports.getAppointment = async (filter) => {
    var appointment = await Appointment.findOne(filter);
    return appointment;
}