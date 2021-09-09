const mongoose = require("mongoose");

const { Schema } = mongoose;
const TreatmentAssign = mongoose.model(
    "tbl_treatment_assign",
    new Schema({
        treatment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tbl_treatment'
        },
        prescription_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tbl_prescription'
        },
        appointment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tbl_appointment'
        },
        number_of_times: {
            type: Number
        },
        from_time: {
            type: String
        },
        to_time: {
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
module.exports = TreatmentAssign;

module.exports.getTreatmentAssignList = async (options = {}) => {
    var data = TreatmentAssign;
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

module.exports.createNewTreatmentAssign = async (treatmentassign) => {
    treatmentassign = await TreatmentAssign.create(treatmentassign);
    return treatmentassign;
}

module.exports.getTreatmentAssignById = async (id) => {
    var treatmentassign = await TreatmentAssign.findOne({ _id: id, deleted_at: "" });
    return treatmentassign
}

module.exports.updateTreatmentAssign = async (olddetails, newdetails) => {
    Object.keys(newdetails).forEach(key => {
        olddetails[key] = newdetails[key];
    });
    olddetails.updated_at = Date.now();
    newdetails = await olddetails.save();
    return newdetails
}

module.exports.getTreatmentAssign = async (filter) => {
    var treatmentassign = await TreatmentAssign.findOne(filter);
    return treatmentassign;
}