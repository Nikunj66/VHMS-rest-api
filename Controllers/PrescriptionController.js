const { Prescription, Patient } = require("../Models/Model");
const Pagination = require("../Services/Pagination");

module.exports.list = async (req, res) => {
    var patient = await Patient.getPatientById(req.params.pid)
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Patient not found !!",
            "request": req.body,
            "patient_id": req.params.pid
        });
    }
    var filter = { deleted_at: "" };
    filter.patient_id = req.params.pid;
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var prescription = await Prescription.getPrescriptionList({ filter, like });
    prescription = await Pagination.paginate(prescription, req.query.page);
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "pagination": prescription.pagination,
            "result": prescription.data
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All prescriptions data successfully fatched",
        "filter": {},
        "pagination": prescription.pagination,
        "result": prescription.data
    });
}

module.exports.add = async (req, res) => {
    var patient = await Patient.getPatientById(req.params.pid)
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Patient not found !!",
            "request": req.body,
            "patient_id": req.params.pid
        });
    }
    var prescriptiondetails = {
        "patient_id": req.params.pid,
        "startdate": req.body.startdate,
        "days": req.body.days,
        "treatment_description": req.body.treatment_description,
        "diagnosis_details": req.body.diagnosis_details
    };

    var prescription = await Prescription.createNewPrescription(prescriptiondetails);
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": prescription
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Prescription registered successfully",
        "request": req.body,
        "result": prescription
    });
}

module.exports.get = async (req, res) => {
    if (req.params.pid) {
        var patient = await Patient.getPatientById(req.params.pid)
        if (!patient) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Patient not found !!",
                "request": req.body,
                "patient_id": req.params.pid
            });
        }
    }
    var prescription = await Prescription.getPrescriptionById(req.params.id);
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription id not found, check it again",
            "request": req.body,
            "result": prescription
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Successfully get the data of prescription",
        "request": req.body,
        "result": prescription
    });
}

module.exports.update = async (req, res) => {
    if (req.params.pid) {
        var patient = await Patient.getPatientById(req.params.pid)
        if (!patient) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Patient not found !!",
                "request": req.body,
                "patient_id": req.params.pid
            });
        }
    }
    var olddetails = await Prescription.getPrescriptionById(req.params.id);
    if (!olddetails) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription id not found, check it again",
            "request": req.body,
            "result": olddetails
        });
    }
    var newdetails = {
        "startdate": req.body.startdate,
        "days": req.body.days,
        "treatment_description": req.body.treatment_description,
        "diagnosis_details": req.body.diagnosis_details
    }

    if (req.params.pid) {
        newdetails.patient_id = req.params.pid
    }

    var prescription = await Prescription.updatePrescription(olddetails, newdetails);
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": prescription
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Prescription details successfully updated",
        "request": req.body,
        "result": prescription
    });
}

module.exports.deactivate = async (req, res) => {
    var patient = await Patient.getPatientById(req.params.pid)
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Patient not found !!",
            "request": req.body,
            "patient_id": req.params.pid
        });
    }
    var prescription = await Prescription.getPrescriptionById(req.params.id);
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription id not found, check it again",
            "request": req.body,
            "result": prescription
        });
    }
    var newdetails = {
        "is_active": false
    }
    var prescription = await Prescription.updatePrescription(prescription, newdetails);
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": prescription
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Prescription successfully deactivated",
        "request": req.body,
        "result": prescription
    });
}
module.exports.activate = async (req, res) => {
    var patient = await Patient.getPatientById(req.params.pid)
    if (!patient) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Patient not found !!",
            "request": req.body,
            "patient_id": req.params.pid
        });
    }
    var prescription = await Prescription.getPrescriptionById(req.params.id);
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription id not found, check it again",
            "request": req.body,
            "result": prescription
        });
    }
    var newdetails = {
        "is_active": true
    }
    var prescription = await Prescription.updatePrescription(prescription, newdetails);
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": prescription
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Prescription successfully activated",
        "request": req.body,
        "result": prescription
    });
}
module.exports.remove = async (req, res) => {
    for (let index = 0; index < req.body.id.length; index++) {
        var patient = await Patient.getPatientById(req.params.pid)
        if (!patient) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Patient not found !!",
                "request": req.body,
                "patient_id": req.params.pid
            });
        }
        var prescription = await Prescription.getPrescriptionById(req.body.id[index]);
        if (!prescription) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Prescription id not found, check it again",
                "request": req.body.id[index],
                "result": prescription
            });
        }
        var newdetails = {
            "deleted_at": Date.now()
        }
        var prescription = await Prescription.updatePrescription(prescription, newdetails);
        if (!prescription) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Something went wrong !!! Try again",
                "request": req.body.id[index],
                "result": prescription
            });
        }
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Prescription successfully deleted",
        "request": req.body,
        "result": prescription
    });
}