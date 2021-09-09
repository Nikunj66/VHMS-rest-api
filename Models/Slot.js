const mongoose = require("mongoose");

const { Schema } = mongoose;
const Slot = mongoose.model(
	"tbl_slot",
	new Schema({
		from_time: {
			type: String
		},
		to_time: {
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
module.exports = Slot;

module.exports.getSlotList = async (options = {}) => {
	var data = Slot;
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

module.exports.createNewSlot = async (slot) => {
	slot = await Slot.create(slot);
	return slot;
}

module.exports.getSlotById = async (id) => {
	var slot = await Slot.findOne({ _id: id, deleted_at: "" });
	return slot
}

module.exports.updateSlot = async (olddetails, newdetails) => {
	Object.keys(newdetails).forEach(key => {
		olddetails[key] = newdetails[key];
	});
	olddetails.updated_at = Date.now();
	newdetails = await olddetails.save();
	return newdetails
}

module.exports.getSlot = async (filter) => {
	var slot = await Slot.findOne(filter);
	return (slot) ? slot : false;
}