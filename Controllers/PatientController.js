const { Patient } = require("../Models/Model");
const Pagination = require("../Services/Pagination");

module.exports.list = async (req, res) => {
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var patient = await Patient.getPatientList({ filter: { deleted_at: "" }, like });
    patient = await Pagination.paginate(patient, req.query.page);
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "pagination": patient.pagination,
            "result": patient.data
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All patients data successfully fatched",
        "filter": {},
        "pagination": patient.pagination,
        "result": patient.data
    });
}
module.exports.listWithoutPagination = async (req, res) => {
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var patient = await Patient.getPatientList({ filter: { deleted_at: "" }, like });
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": patient
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All patients data successfully fatched",
        "filter": {},
        "result": patient
    });
}
module.exports.add = async (req, res) => {
    var patientdetails = {
        "name": req.body.name,
        "contactno": req.body.contactno,
        "address": req.body.address,
        "city": req.body.city,
        "other": req.body.other
    };
    var patient = await Patient.createNewPatient(patientdetails);
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": patient
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Patient registered successfully",
        "request": req.body,
        "result": patient
    });
}

module.exports.get = async (req, res) => {
    var patient = await Patient.getPatientById(req.params.id);
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Patient id not found, check it again",
            "request": req.body,
            "result": patient
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Successfully get the data of patient",
        "request": req.body,
        "result": patient
    });
}

module.exports.update = async (req, res) => {
    var olddetails = await Patient.getPatientById(req.params.id);
    if (!olddetails) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Patient id not found, check it again",
            "request": req.body,
            "result": olddetails
        });
    }
    var newdetails = {
        "name": req.body.name,
        "contactno": req.body.contactno,
        "address": req.body.address,
        "city": req.body.city,
        "other": req.body.other
    }
    var patient = await Patient.updatePatient(olddetails, newdetails);
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": patient
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Patient details successfully updated",
        "request": req.body,
        "result": patient
    });
}

module.exports.deactivate = async (req, res) => {
    var patient = await Patient.getPatientById(req.params.id);
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Patient id not found, check it again",
            "request": req.body,
            "result": patient
        });
    }
    var newdetails = {
        "is_active": false
    }
    var patient = await Patient.updatePatient(patient, newdetails);
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": patient
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Patient successfully deactivated",
        "request": req.body,
        "result": patient
    });
}
module.exports.activate = async (req, res) => {
    var patient = await Patient.getPatientById(req.params.id);
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Patient id not found, check it again",
            "request": req.body,
            "result": patient
        });
    }
    var newdetails = {
        "is_active": true
    }
    var patient = await Patient.updatePatient(patient, newdetails);
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": patient
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Patient successfully activated",
        "request": req.body,
        "result": patient
    });
}
module.exports.remove = async (req, res) => {
    for (let index = 0; index < req.body.id.length; index++) {
        var patient = await Patient.getPatientById(req.body.id[index]);
        if (!patient) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Patient id not found, check it again",
                "request": req.body.id[index],
                "result": patient
            });
        }
        var newdetails = {
            "deleted_at": Date.now()
        }
        var patient = await Patient.updatePatient(patient, newdetails);
        if (!patient) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Something went wrong !!! Try again",
                "request": req.body.id[index],
                "result": patient
            });
        }
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Patient successfully deleted",
        "request": req.body,
        "result": patient
    });
}
