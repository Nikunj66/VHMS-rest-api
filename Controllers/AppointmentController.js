const { Appointment, Prescription } = require("../Models/Model");
const Pagination = require("../Services/Pagination");

module.exports.list = async (req, res) => {
    var filter = {};
    if (req.params.pid) {
        var prescription = await Prescription.getPrescriptionById(req.params.pid)
        if (!prescription) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Prescription not found !!",
                "request": req.body,
                "prescription_id": req.params.pid
            });
        }
        filter.prescription_id = req.params.pid;
    }
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var appointment = await Appointment.getAppointmentList({ filter: { deleted_at: "" }, like });
    appointment = await Pagination.paginate(appointment, req.query.page);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "pagination": appointment.pagination,
            "result": appointment.data
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All appointments data successfully fatched",
        "filter": {},
        "pagination": appointment.pagination,
        "result": appointment.data
    });
}
module.exports.listWithoutPagination = async (req, res) => {
    var filter = {};
    if (req.params.pid) {
        var prescription = await Prescription.getPrescriptionById(req.params.pid)
        if (!prescription) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Prescription not found !!",
                "request": req.body,
                "prescription_id": req.params.pid
            });
        }
        filter.prescription_id = req.params.pid;
    }
    var appointment = await Appointment.getAppointmentList(filter);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": appointment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All appointments data successfully fatched",
        "filter": {},
        "result": appointment
    });
}

module.exports.add = async (req, res) => {
    var prescription = await Prescription.getPrescriptionById(req.params.pid)
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription not found !!",
            "request": req.body,
            "prescription_id": req.params.pid
        });
    }
    var appointmentdetails = {
        "prescription_id": req.params.pid,
        "from_time": req.body.from_time,
        "to_time": req.body.to_time,
        "staff_id": req.body.staff_id,
        "date": req.body.date
    };
    var appointment = await Appointment.createNewAppointment(appointmentdetails);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": appointment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Appointment registered successfully",
        "request": req.body,
        "result": appointment
    });
}

module.exports.get = async (req, res) => {
    var prescription = await Prescription.getPrescriptionById(req.params.pid)
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription not found !!",
            "request": req.body,
            "prescription_id": req.params.pid
        });
    }
    var appointment = await Appointment.getAppointmentById(req.params.id);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Appointment id not found, check it again",
            "request": req.body,
            "result": appointment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Successfully get the data of appointment",
        "request": req.body,
        "result": appointment
    });
}

module.exports.update = async (req, res) => {
    var prescription = await Prescription.getPrescriptionById(req.params.pid)
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription not found !!",
            "request": req.body,
            "prescription_id": req.params.pid
        });
    }
    var olddetails = await Appointment.getAppointmentById(req.params.id);
    if (!olddetails) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Appointment id not found, check it again",
            "request": req.body,
            "result": olddetails
        });
    }
    var newdetails = {
        "prescription_id": req.params.pid,
        "from_time": req.body.from_time,
        "to_time": req.body.to_time,
        "staff_id": req.body.staff_id,
        "date": req.body.date
    }
    var appointment = await Appointment.updateAppointment(olddetails, newdetails);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": appointment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Appointment details successfully updated",
        "request": req.body,
        "result": appointment
    });
}

module.exports.deactivate = async (req, res) => {
    var prescription = await Prescription.getPrescriptionById(req.params.pid)
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription not found !!",
            "request": req.body,
            "prescription_id": req.params.pid
        });
    }
    var appointment = await Appointment.getAppointmentById(req.params.id);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Appointment id not found, check it again",
            "request": req.body,
            "result": appointment
        });
    }
    var newdetails = {
        "is_active": false
    }
    var appointment = await Appointment.updateAppointment(appointment, newdetails);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": appointment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Appointment successfully deactivated",
        "request": req.body,
        "result": appointment
    });
}
module.exports.activate = async (req, res) => {
    var prescription = await Prescription.getPrescriptionById(req.params.pid)
    if (!prescription) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Prescription not found !!",
            "request": req.body,
            "prescription_id": req.params.pid
        });
    }
    var appointment = await Appointment.getAppointmentById(req.params.id);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Appointment id not found, check it again",
            "request": req.body,
            "result": appointment
        });
    }
    var newdetails = {
        "is_active": true
    }
    var appointment = await Appointment.updateAppointment(appointment, newdetails);
    if (!appointment) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": appointment
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Appointment successfully activated",
        "request": req.body,
        "result": appointment
    });
}
module.exports.remove = async (req, res) => {
    for (let index = 0; index < req.body.id.length; index++) {
        var prescription = await Prescription.getPrescriptionById(req.params.pid)
        if (!prescription) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Prescription not found !!",
                "request": req.body,
                "prescription_id": req.params.pid
            });
        }
        var appointment = await Appointment.getAppointmentById(req.body.id[index]);
        if (!appointment) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Appointment id not found, check it again",
                "request": req.body.id[index],
                "result": appointment
            });
        }
        var newdetails = {
            "deleted_at": Date.now()
        }
        var appointment = await Appointment.updateAppointment(appointment, newdetails);
        if (!appointment) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Something went wrong !!! Try again",
                "request": req.body.id[index],
                "result": appointment
            });
        }
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Appointment successfully deleted",
        "request": req.body,
        "result": appointment
    });
}
