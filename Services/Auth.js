const { Staff } = require("../Models/Model");
const Bcrypt = require("./Bcrypt");
const JWT = require("./JWT");

class Auth {
    static checkAutheticationDetails = async (username, password) => {
        var staff = await Staff.findOne({ username: username, deleted_at: "" });
        if (staff) {
            if (staff.is_active) {
                if (await Bcrypt.comparePassword(password, staff.password)) {
                    var token = await JWT.generateToken({
                        "_id": staff._id,
                        "role": staff.role
                    });
                    return {
                        success: true,
                        message: "Login successful !!!",
                        token,
                        result: staff
                    };
                }
                else {
                    return {
                        success: false,
                        message: "Invalid Credentials !!!"
                    };
                }
            }
            else {
                return {
                    success: false,
                    message: "Invalid Credentials !!!"
                };
            }
        }
        else {
            return {
                success: false,
                message: "Invalid Credentials !!!"
            };
        }
    }
}

module.exports = Auth