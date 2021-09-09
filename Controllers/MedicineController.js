const { Medicine } = require("../Models/Model");
const Pagination = require("../Services/Pagination");

module.exports.list = async (req, res) => {
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var medicine = await Medicine.getMedicineList({ filter: { deleted_at: "" }, like });
    medicine = await Pagination.paginate(medicine, req.query.page);
    if (!medicine) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "pagination": medicine.pagination,
            "result": medicine.data
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All medicines data successfully fatched",
        "filter": {},
        "pagination": medicine.pagination,
        "result": medicine.data
    });
}

module.exports.add = async (req, res) => {
    var medicinedetails = {
        "name": req.body.name,
        "price": req.body.price
    };
    var medicine = await Medicine.createNewMedicine(medicinedetails);
    if (!medicine) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": medicine
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Medicine registered successfully",
        "request": req.body,
        "result": medicine
    });
}

module.exports.get = async (req, res) => {
    var medicine = await Medicine.getMedicineById(req.params.id);
    if (!medicine) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Medicine id not found, check it again",
            "request": req.body,
            "result": medicine
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Successfully get the data of medicine",
        "request": req.body,
        "result": medicine
    });
}

module.exports.update = async (req, res) => {
    var olddetails = await Medicine.getMedicineById(req.params.id);
    if (!olddetails) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Medicine id not found, check it again",
            "request": req.body,
            "result": olddetails
        });
    }
    var newdetails = {
        "name": req.body.name,
        "price": req.body.price
    }
    var medicine = await Medicine.updateMedicine(olddetails, newdetails);
    if (!medicine) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": medicine
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Medicine details successfully updated",
        "request": req.body,
        "result": medicine
    });
}

module.exports.deactivate = async (req, res) => {
    var medicine = await Medicine.getMedicineById(req.params.id);
    if (!medicine) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Medicine id not found, check it again",
            "request": req.body,
            "result": medicine
        });
    }
    var newdetails = {
        "is_active": false
    }
    var medicine = await Medicine.updateMedicine(medicine, newdetails);
    if (!medicine) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": medicine
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Medicine successfully deactivated",
        "request": req.body,
        "result": medicine
    });
}
module.exports.activate = async (req, res) => {
    var medicine = await Medicine.getMedicineById(req.params.id);
    if (!medicine) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Medicine id not found, check it again",
            "request": req.body,
            "result": medicine
        });
    }
    var newdetails = {
        "is_active": true
    }
    var medicine = await Medicine.updateMedicine(medicine, newdetails);
    if (!medicine) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": medicine
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Medicine successfully activated",
        "request": req.body,
        "result": medicine
    });
}
module.exports.remove = async (req, res) => {
    for (let index = 0; index < req.body.id.length; index++) {
        var medicine = await Medicine.getMedicineById(req.body.id[index]);
        if (!medicine) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Medicine id not found, check it again",
                "request": req.body.id[index],
                "result": medicine
            });
        }
        var newdetails = {
            "deleted_at": Date.now()
        }
        var medicine = await Medicine.updateMedicine(medicine, newdetails);
        if (!medicine) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Something went wrong !!! Try again",
                "request": req.body.id[index],
                "result": medicine
            });
        }
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Medicine successfully deleted",
        "request": req.body,
        "result": medicine
    });
}
