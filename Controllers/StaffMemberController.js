const { Staff } = require("../Models/Model");
const Pagination = require("../Services/Pagination");

module.exports.list = async (req, res) => {
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var staffmember = await Staff.getStaffmemberList({ filter: { deleted_at: "" }, like });

    staffmember = await Pagination.paginate(staffmember, req.query.page);
    if (!staffmember) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "pagination": staffmember.pagination,
            "result": staffmember.data
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "all staffmembers data successfully fatched",
        "filter": {},
        "pagination": staffmember.pagination,
        "result": staffmember.data
    });
}

module.exports.listWithoutPagination = async (req, res) => {
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var staffmember = await Staff.getStaffmemberList({ filter: { deleted_at: "" }, like });
    if (!staffmember) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": staffmember
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "all staffmembers data successfully fatched",
        "filter": {},
        "result": staffmember
    });
}

module.exports.add = async (req, res) => {
    var staffmemberdetails = {
        "name": req.body.name,
        "contactno": req.body.contactno,
        "username": req.body.username,
        "password": req.body.password,
        "role": req.body.role
    };
    var staffmember = await Staff.createNewStaffmember(staffmemberdetails);
    if (!staffmember) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": staffMember
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Staffmember registered successfully",
        "request": req.body,
        "result": staffmember
    });
}

module.exports.get = async (req, res) => {
    var staffmember = await Staff.getStaffmemberById(req.params.id);
    if (!staffmember) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Staffmember id not found, check it again",
            "request": req.body,
            "result": staffmember
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Successfully get the data of staff member",
        "request": req.body,
        "result": staffmember
    });
}

module.exports.update = async (req, res) => {
    var olddetails = await Staff.getStaffmemberById(req.params.id);
    if (!olddetails) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Staffmember id not found, check it again",
            "request": req.body,
            "result": staffmember
        });
    }
    var newdetails = {
        "name": req.body.name,
        "contactno": req.body.contactno,
        "username": req.body.username,
        "password": req.body.password,
        "role": req.body.role
    }
    var staffmember = await Staff.updateStaffMember(olddetails, newdetails);
    if (!staffmember) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": staffmember
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Staffmember details successfully updated",
        "request": req.body,
        "result": staffmember
    });
}

module.exports.deactivate = async (req, res) => {
    var staffmember = await Staff.getStaffmemberById(req.params.id);
    if (!staffmember) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Staffmember id not found, check it again",
            "request": req.body,
            "result": staffmember
        });
    }
    var newdetails = {
        "is_active": false
    }
    var staffmember = await Staff.updateStaffMember(staffmember, newdetails);
    if (!staffmember) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": staffmember
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Staffmember successfully deactivated",
        "request": req.body,
        "result": staffmember
    });
}
module.exports.activate = async (req, res) => {
    var staffmember = await Staff.getStaffmemberById(req.params.id);
    if (!staffmember) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Staffmember id not found, check it again",
            "request": req.body,
            "result": staffmember
        });
    }
    var newdetails = {
        "is_active": true
    }
    var staffmember = await Staff.updateStaffMember(staffmember, newdetails);
    if (!staffmember) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": staffmember
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Staffmember successfully activated",
        "request": req.body,
        "result": staffmember
    });
}
module.exports.remove = async (req, res) => {
    for (let index = 0; index < req.body.id.length; index++) {
        var staffmember = await Staff.getStaffmemberById(req.body.id[index]);
        if (!staffmember) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Staffmember id not found, check it again",
                "request": req.body.id[index],
                "result": staffmember
            });
        }
        var newdetails = {
            "deleted_at": Date.now()
        }
        var staffmember = await Staff.updateStaffMember(staffmember, newdetails);
        if (!staffmember) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Something went wrong !!! Try again",
                "request": req.body.id[index],
                "result": staffmember
            });
        }
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Staffmember successfully deleted",
        "request": req.body,
        "result": staffmember
    });
}
global.generateLikeObject = (like) => {
    for (key in like) {
        var item = like[key]
        if (new RegExp('.*id').test(key)) {
            like[key] = item
            if (item == "") {
                delete like[key]
            }
        }
        else if (new RegExp('.*date').test(key)) {
            like[key] = item
        }
        else if (!(new RegExp('^is_*').test(key))) {
            like[key] = {
                $regex: new RegExp(".*" + item + ".*", "i")
            }
        }
        else {
            if (item != "") {
                like[key] = Boolean(Number(item))
            }
            else {
                delete like[key]
            }
        }
    }
    return like
}