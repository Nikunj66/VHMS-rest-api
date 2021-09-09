const mongoose = require("mongoose");

const { Schema } = mongoose;
const Patient = mongoose.model(
	"tbl_patient",
	new Schema({
		name: {
			type: String,
		},
		contactno: {
			type: String,
		},
		address: {
			type: String,
		},
		city: {
			type: String,
		},
		other: {
			type: String,
		},
		is_active: {
			type: Boolean,
			default: true,
		},
		deleted_at: {
			type: Date
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
		},
		updated_by: {
			type: mongoose.Schema.Types.ObjectId,
		},
		deleted_by: {
			type: mongoose.Schema.Types.ObjectId,
		}
	}, { timestamps: true })
);
module.exports = Patient;

module.exports.getPatientList = async (options = {}) => {
	var data = Patient;
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

module.exports.createNewPatient = async (patient) => {
	patient = await Patient.create(patient);
	return patient;
}

module.exports.getPatientById = async (id) => {
	var patient = await Patient.findOne({ _id: id, deleted_at: "" });
	return patient
}

module.exports.getPatientByPrescription = async (prescription) => {
	var patient = await Patient.findOne({ _id: prescription.patient_id, deleted_at: "" });
	return patient
}

module.exports.updatePatient = async (olddetails, newdetails) => {
	Object.keys(newdetails).forEach(key => {
		olddetails[key] = newdetails[key];
	});
	olddetails.updated_at = Date.now();
	newdetails = await olddetails.save();
	return newdetails
}

module.exports.getPatient = async (filter) => {
	var patient = await Patient.findOne(filter);
	return (patient) ? patient : false;
}