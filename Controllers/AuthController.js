const { Staff } = require("../Models/Model");
const Auth = require("../Services/Auth");

module.exports.registerStaffmember = async (req, res) => {
    var staffMember = await Staff.createNewStaffmember({
        "name": req.body.name,
        "contactno": req.body.contactno,
        "username": req.body.username,
        "password": req.body.password,
        "role": req.body.role
    });
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Staff member registered successfully",
        "request": req.body,
        "result": staffMember
    });
};

module.exports.autheticateStaffMember = async (req, res) => {
    var data = await Auth.checkAutheticationDetails(req.body.username, req.body.password);
    if (data.success) {
        return res.status(200).send(data);
    }
    else {
        return res.status(200).send(data);
    }
};
