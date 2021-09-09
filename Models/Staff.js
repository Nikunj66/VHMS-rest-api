const mongoose = require("mongoose");
const Bcrypt = require("../Services/Bcrypt");

const { Schema } = mongoose;
const Staff = mongoose.model(
	"tbl_staff",
	new Schema({
		name: {
			type: String,
		},
		contactno: {
			type: String,
		},
		username: {
			type: String,
		},
		password: {
			type: String,
		},
		role: {
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
module.exports = Staff;

module.exports.getStaffmemberList = async (options = {}) => {
	var data = Staff;
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

module.exports.createNewStaffmember = async (staffmember) => {
	staffmember.password = await Bcrypt.encodePassword(staffmember.password),
		staffmember = await Staff.create(staffmember);
	return staffmember;
}

module.exports.getStaffmemberById = async (id) => {
	var staffmember = await Staff.findOne({ _id: id, deleted_at: "" });
	return staffmember
}

module.exports.updateStaffMember = async (olddetails, newdetails) => {
	newdetails.password = olddetails.password
	Object.keys(newdetails).forEach(key => {
		olddetails[key] = newdetails[key];
	});
	olddetails.updated_at = Date.now();
	newdetails = await olddetails.save();
	return newdetails
}

module.exports.getStaffmember = async (filter) => {
	var staffmember = await Staff.findOne(filter);
	return (staffmember) ? staffmember : false;
}