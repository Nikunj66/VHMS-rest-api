const { Treatment } = require("../Models/Model");
const Pagination = require("../Services/Pagination");

module.exports.list = async (req, res) => {
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var treatment = await Treatment.getTreatmentList({ filter: { deleted_at: "" }, like });
    treatment = await Pagination.paginate(treatment, req.query.page);
    if (!treatment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "pagination": treatment.pagination,
            "result": treatment.data
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All treatments data successfully fatched",
        "filter": {},
        "pagination": treatment.pagination,
        "result": treatment.data
    });
}

module.exports.add = async (req, res) => {
    var treatmentdetails = {
        "name": req.body.name,
        "price": req.body.price
    };
    var treatment = await Treatment.createNewTreatment(treatmentdetails);
    if (!treatment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": treatment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Treatment registered successfully",
        "request": req.body,
        "result": treatment
    });
}

module.exports.get = async (req, res) => {
    var treatment = await Treatment.getTreatmentById(req.params.id);
    if (!treatment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Treatment id not found, check it again",
            "request": req.body,
            "result": treatment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Successfully get the data of treatment",
        "request": req.body,
        "result": treatment
    });
}

module.exports.update = async (req, res) => {
    var olddetails = await Treatment.getTreatmentById(req.params.id);
    if (!olddetails) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Treatment id not found, check it again",
            "request": req.body,
            "result": olddetails
        });
    }
    var newdetails = {
        "name": req.body.name,
        "price": req.body.price
    }
    var treatment = await Treatment.updateTreatment(olddetails, newdetails);
    if (!treatment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": treatment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Treatment details successfully updated",
        "request": req.body,
        "result": treatment
    });
}

module.exports.deactivate = async (req, res) => {
    var treatment = await Treatment.getTreatmentById(req.params.id);
    if (!treatment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Treatment id not found, check it again",
            "request": req.body,
            "result": treatment
        });
    }
    var newdetails = {
        "is_active": false
    }
    var treatment = await Treatment.updateTreatment(treatment, newdetails);
    if (!treatment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": treatment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Treatment successfully deactivated",
        "request": req.body,
        "result": treatment
    });
}
module.exports.activate = async (req, res) => {
    var treatment = await Treatment.getTreatmentById(req.params.id);
    if (!treatment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Treatment id not found, check it again",
            "request": req.body,
            "result": treatment
        });
    }
    var newdetails = {
        "is_active": true
    }
    var treatment = await Treatment.updateTreatment(treatment, newdetails);
    if (!treatment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": treatment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Treatment successfully activated",
        "request": req.body,
        "result": treatment
    });
}
module.exports.remove = async (req, res) => {
    for (let index = 0; index < req.body.id.length; index++) {
        var treatment = await Treatment.getTreatmentById(req.body.id[index]);
        if (!treatment) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Treatment id not found, check it again",
                "request": req.body.id[index],
                "result": treatment
            });
        }
        var newdetails = {
            "deleted_at": Date.now()
        }
        var treatment = await Treatment.updateTreatment(treatment, newdetails);
        if (!treatment) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Something went wrong !!! Try again",
                "request": req.body.id[index],
                "result": treatment
            });
        }
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Treatment successfully deleted",
        "request": req.body,
        "result": treatment
    });
}
