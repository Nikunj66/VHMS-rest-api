const mongoose = require("mongoose");

const { Schema } = mongoose;

const Fraction = mongoose.model(
	"tbl_fraction",
	new Schema({
		is_morning: {
			type: Boolean
		},
		is_afternoon: {
			type: Boolean
		},
		is_evening: {
			type: Boolean
		},
		is_night: {
			type: Boolean
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
module.exports = Fraction;

module.exports.getFractionList = async (options = {}) => {
	var data = Fraction;
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

module.exports.createNewFraction = async (fraction) => {
	fraction = await Fraction.create(fraction);
	return fraction;
}

module.exports.getFractionById = async (id) => {
	var fraction = await Fraction.findOne({ _id: id, deleted_at: "" });
	return fraction
}

module.exports.updateFraction = async (olddetails, newdetails) => {
	Object.keys(newdetails).forEach(key => {
		olddetails[key] = newdetails[key];
	});
	olddetails.updated_at = Date.now();
	newdetails = await olddetails.save();
	return newdetails
}

module.exports.getFraction = async (filter) => {
	var fraction = await Fraction.findOne(filter);
	return (fraction) ? fraction : false;
}