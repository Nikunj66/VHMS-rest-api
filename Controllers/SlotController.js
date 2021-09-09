const { Slot } = require("../Models/Model");
const Pagination = require("../Services/Pagination");

module.exports.list = async (req, res) => {
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var slot = await Slot.getSlotList({ filter: { deleted_at: "" }, like });
    slot = await Pagination.paginate(slot, req.query.page);
    if (!slot) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "pagination": slot.pagination,
            "result": slot.data
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All slots data successfully fatched",
        "filter": {},
        "pagination": slot.pagination,
        "result": slot.data
    });
}

module.exports.add = async (req, res) => {
    var slotdetails = {
        "from_time": req.body.from_time,
        "to_time": req.body.to_time,
    };
    var slot = await Slot.createNewSlot(slotdetails);
    if (!slot) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": slot
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Slot registered successfully",
        "request": req.body,
        "result": slot
    });
}

module.exports.get = async (req, res) => {
    var slot = await Slot.getSlotById(req.params.id);
    if (!slot) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Slot id not found, check it again",
            "request": req.body,
            "result": slot
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Successfully get the data of slot",
        "request": req.body,
        "result": slot
    });
}

module.exports.update = async (req, res) => {
    var olddetails = await Slot.getSlotById(req.params.id);
    if (!olddetails) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Slot id not found, check it again",
            "request": req.body,
            "result": olddetails
        });
    }
    var newdetails = {
        "from_time": req.body.from_time,
        "to_time": req.body.to_time,
    }
    var slot = await Slot.updateSlot(olddetails, newdetails);
    if (!slot) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": slot
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Slot details successfully updated",
        "request": req.body,
        "result": slot
    });
}

module.exports.deactivate = async (req, res) => {
    var slot = await Slot.getSlotById(req.params.id);
    if (!slot) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Slot id not found, check it again",
            "request": req.body,
            "result": slot
        });
    }
    var newdetails = {
        "is_active": false
    }
    var slot = await Slot.updateSlot(slot, newdetails);
    if (!slot) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": slot
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Slot successfully deactivated",
        "request": req.body,
        "result": slot
    });
}
module.exports.activate = async (req, res) => {
    var slot = await Slot.getSlotById(req.params.id);
    if (!slot) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Slot id not found, check it again",
            "request": req.body,
            "result": slot
        });
    }
    var newdetails = {
        "is_active": true
    }
    var slot = await Slot.updateSlot(slot, newdetails);
    if (!slot) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": slot
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Slot successfully activated",
        "request": req.body,
        "result": slot
    });
}
module.exports.remove = async (req, res) => {
    for (let index = 0; index < req.body.id.length; index++) {
        var slot = await Slot.getSlotById(req.body.id[index]);
        if (!slot) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Slot id not found, check it again",
                "request": req.body.id[index],
                "result": slot
            });
        }
        var newdetails = {
            "deleted_at": Date.now()
        }
        var slot = await Slot.updateSlot(slot, newdetails);
        if (!slot) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Something went wrong !!! Try again",
                "request": req.body.id[index],
                "result": slot
            });
        }
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Slot successfully deleted",
        "request": req.body,
        "result": slot
    });
}
