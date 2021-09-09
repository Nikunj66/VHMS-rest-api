const mongoose = require("mongoose");

const { Schema } = mongoose;
const Treatment = mongoose.model(
	"tbl_treatment",
	new Schema({
		name: {
			type: String
		},
		price: {
			type: Number
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
module.exports = Treatment;

module.exports.getTreatmentList = async (options = {}) => {
	var data = Treatment;
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

module.exports.createNewTreatment = async (treatment) => {
	treatment = await Treatment.create(treatment);
	return treatment;
}

module.exports.getTreatmentById = async (id) => {
	var treatment = await Treatment.findOne({ _id: id, deleted_at: "" });
	return treatment
}

module.exports.updateTreatment = async (olddetails, newdetails) => {
	Object.keys(newdetails).forEach(key => {
		olddetails[key] = newdetails[key];
	});
	olddetails.updated_at = Date.now();
	newdetails = await olddetails.save();
	return newdetails
}

module.exports.getTreatment = async (filter) => {
	var treatment = await Treatment.findOne(filter);
	return (treatment) ? treatment : false;
}