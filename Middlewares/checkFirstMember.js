const { Staff } = require("../Models/Model")

module.exports.checkFirstMember = async (req, res, next) => {
    var staffmembers = await Staff.getStaffmemberList({is_active:true});
    if (staffmembers.length) {
        return res.status(200).send({
            success: true,
            "statusCode": 200,
            "message": 'First user already registered',
            "request": req.body,
        });
    }
    else{
        next();
    }
}