const { TreatmentAssign, Appointment, Prescription } = require("../Models/Model");
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
    var treatmentassignlist = await TreatmentAssign.getTreatmentAssignList({ filter, like });
    if (!treatmentassignlist) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": treatmentassignlist
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All treatments assign data successfully fatched",
        "filter": {},
        "result": treatmentassignlist
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
    var treatmentassigndetails = {
        "treatment_id": req.body.treatment_id,
        "prescription_id": req.params.pid,
        "appointment_id": req.params.aid,
        "number_of_times": req.body.number_of_times,
        "from_time": req.body.from_time,
        "to_time": req.body.to_time,
    };
    var treatmentassign = await TreatmentAssign.createNewTreatmentAssign(treatmentassigndetails);
    if (!treatmentassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": treatmentassign
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Treatment registered successfully",
        "request": req.body,
        "result": treatmentassign
    });
}

module.exports.get = async (req, res) => {
    var treatmentassign = await TreatmentAssign.getTreatmentAssignById(req.params.id);
    if (!treatmentassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Treatment id not found, check it again",
            "request": req.body,
            "result": treatmentassign
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Successfully get the data of treatment assign",
        "request": req.body,
        "result": treatmentassign
    });
}

module.exports.update = async (req, res) => {
    var olddetails = await TreatmentAssign.getTreatmentAssignById(req.params.id);
    if (!olddetails) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Treatment Assign id not found, check it again",
            "request": req.body,
            "result": olddetails
        });
    }
    var newdetails = {
        "treatment_id": req.body.treatment_id,
        "number_of_times": req.body.number_of_times,
        "from_time": req.body.from_time,
        "to_time": req.body.to_time,
    }
    var treatmentassign = await TreatmentAssign.updateTreatmentAssign(olddetails, newdetails);
    if (!treatmentassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": treatmentassign
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Treatment details successfully updated",
        "request": req.body,
        "result": treatmentassign
    });
}

module.exports.deactivate = async (req, res) => {
    var treatmentassign = await TreatmentAssign.getTreatmentAssignById(req.params.id);
    if (!treatmentassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Treatment Assign id not found, check it again",
            "request": req.body,
            "result": treatmentassign
        });
    }
    var newdetails = {
        "is_active": false
    }
    var treatmentassign = await TreatmentAssign.updateTreatmentAssign(treatmentassign, newdetails);
    if (!treatmentassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": treatmentassign
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Treatment Assign successfully deactivated",
        "request": req.body,
        "result": treatmentassign
    });
}

module.exports.activate = async (req, res) => {
    var treatmentassign = await TreatmentAssign.getTreatmentAssignById(req.params.id);
    if (!treatmentassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Treatment assign id not found, check it again",
            "request": req.body,
            "result": treatmentassign
        });
    }
    var newdetails = {
        "is_active": true
    }
    var treatmentassign = await TreatmentAssign.updateTreatmentAssign(treatmentassign, newdetails);
    if (!treatmentassign) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": treatmentassign
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Treatment Assign successfully activated",
        "request": req.body,
        "result": treatmentassign
    });
}

module.exports.remove = async (req, res) => {
    for (let index = 0; index < req.body.id.length; index++) {
        var treatmentassign = await TreatmentAssign.getTreatmentAssignById(req.body.id[index]);
        if (!treatmentassign) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Treatment Assign id not found, check it again",
                "request": req.body,
                "result": treatmentassign
            });
        }
        var newdetails = {
            "deleted_at": Date.now()
        }
        var treatmentassign = await TreatmentAssign.updateTreatmentAssign(treatmentassign, newdetails);
        if (!treatmentassign) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Something went wrong !!! Try again",
                "request": req.body,
                "result": treatmentassign
            });
        }
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Treatment Assign successfully deleted",
        "request": req.body,
        "result": treatmentassign
    });
}
