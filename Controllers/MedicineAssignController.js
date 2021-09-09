const { MedicineAssign, Appointment, Prescription } = require("../Models/Model");
const Pagination = require("../Services/Pagination");

module.exports.list = async (req, res) => {
    var prescription = await Prescription.getPrescriptionById(req.params.pid);
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription not found !!!",
            "request": req.body,
            "apointment_id": req.params.pid,
            "result": prescription
        });
    }
    var appointment = await Appointment.getAppointmentById(req.params.aid);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Appointment not found !!!",
            "request": req.body,
            "apointment_id": req.params.aid,
            "result": appointment
        });
    }

    var filter = {
        "prescription_id": req.params.pid,
        "appointment_id": req.params.aid,
        "deleted_at": ""
    }
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var medicineassignlist = await MedicineAssign.getMedicineAssignList({ filter, like });
    if (!medicineassignlist) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": medicineassignlist
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All medicines assign data successfully fatched",
        "filter": {},
        "result": medicineassignlist
    });
}

module.exports.add = async (req, res) => {
    let prescription = await Prescription.getPrescriptionById(req.params.pid);
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription not found !!!",
            "request": req.body,
            "prescription_id": req.params.pid,
            "apointment_id": req.params.aid,
            "result": prescription
        });
    }
    var appointment = await Appointment.getAppointmentById(req.params.aid);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Appointment not found !!!",
            "request": req.body,
            "prescription_id": req.params.pid,
            "apointment_id": req.params.aid,
            "result": appointment
        });
    }
    var medicineassigndetails = {
        "prescription_id": req.params.pid,
        "appointment_id": req.params.aid,
        "medicine_id": req.body.medicine_id,
        "fraction_id": req.body.fraction_id,
        "supportive": req.body.supportive
    };
    var medicineassign = await MedicineAssign.createNewMedicineAssign(medicineassigndetails);
    if (!medicineassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": medicineassign
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Medicine registered successfully",
        "request": req.body,
        "result": medicineassign
    });
}

module.exports.get = async (req, res) => {
    var medicineassign = await MedicineAssign.getMedicineAssignById(req.params.id);
    if (!medicineassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Medicine id not found, check it again",
            "request": req.body,
            "result": medicineassign
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Successfully get the data of medicine assign",
        "request": req.body,
        "result": medicineassign
    });
}

module.exports.update = async (req, res) => {
    var olddetails = await MedicineAssign.getMedicineAssignById(req.params.id);
    if (!olddetails) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Medicine Assign id not found, check it again",
            "request": req.body,
            "result": olddetails
        });
    }
    var newdetails = {
        "medicine_id": req.body.medicine_id,
        "fraction_id": req.body.fraction_id,
        "supportive": req.body.supportive
    }
    var medicineassign = await MedicineAssign.updateMedicineAssign(olddetails, newdetails);
    if (!medicineassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": medicineassign
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Medicine details successfully updated",
        "request": req.body,
        "result": medicineassign
    });
}

module.exports.deactivate = async (req, res) => {
    var medicineassign = await MedicineAssign.getMedicineAssignById(req.params.id);
    if (!medicineassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Medicine Assign id not found, check it again",
            "request": req.body,
            "result": medicineassign
        });
    }
    var newdetails = {
        "is_active": false
    }
    var medicineassign = await MedicineAssign.updateMedicineAssign(medicineassign, newdetails);
    if (!medicineassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": medicineassign
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Medicine Assign successfully deactivated",
        "request": req.body,
        "result": medicineassign
    });
}

module.exports.activate = async (req, res) => {
    var medicineassign = await MedicineAssign.getMedicineAssignById(req.params.id);
    if (!medicineassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Medicine assign id not found, check it again",
            "request": req.body,
            "result": medicineassign
        });
    }
    var newdetails = {
        "is_active": true
    }
    var medicineassign = await MedicineAssign.updateMedicineAssign(medicineassign, newdetails);
    if (!medicineassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": medicineassign
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Medicine Assign successfully activated",
        "request": req.body,
        "result": medicineassign
    });
}

module.exports.remove = async (req, res) => {
    for (let index = 0; index < req.body.id.length; index++) {
        var medicineassign = await MedicineAssign.getMedicineAssignById(req.body.id[index]);
        if (!medicineassign) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Medicine Assign id not found, check it again",
                "request": req.body,
                "result": medicineassign
            });
        }
        var newdetails = {
            "deleted_at": Date.now()
        }
        var medicineassign = await MedicineAssign.updateMedicineAssign(medicineassign, newdetails);
        if (!medicineassign) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Something went wrong !!! Try again",
                "request": req.body,
                "result": medicineassign
            });
        }
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Medicine Assign successfully deleted",
        "request": req.body,
        "result": medicineassign
    });
}
