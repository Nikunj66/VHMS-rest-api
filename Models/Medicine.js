const mongoose = require("mongoose");

const { Schema } = mongoose;
const Medicine = mongoose.model(
	"tbl_medicine",
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
module.exports = Medicine;

module.exports.getMedicineList = async (options = {}) => {
	var data = Medicine;
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

module.exports.createNewMedicine = async (medicine) => {
	medicine = await Medicine.create(medicine);
	return medicine;
}

module.exports.getMedicineById = async (id) => {
	var medicine = await Medicine.findOne({ _id: id, deleted_at: "" });
	return medicine
}

module.exports.updateMedicine = async (olddetails, newdetails) => {
	Object.keys(newdetails).forEach(key => {
		olddetails[key] = newdetails[key];
	});
	olddetails.updated_at = Date.now();
	newdetails = await olddetails.save();
	return newdetails
}

module.exports.getMedicine = async (filter) => {
	var medicine = await Medicine.findOne(filter);
	return (medicine) ? medicine : false;
}