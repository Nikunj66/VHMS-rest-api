const { Fraction } = require("../Models/Model");
const Pagination = require("../Services/Pagination");

module.exports.list = async (req, res) => {
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var fraction = await Fraction.getFractionList({ filter: { deleted_at: "" }, like });
    if (!fraction) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": fraction
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All fractions data successfully fatched",
        "filter": {},
        "result": fraction
    });
}

module.exports.add = async (req, res) => {
    var fractiondetails = {
        "is_morning": req.body.is_morning,
        "is_afternoon": req.body.is_afternoon,
        "is_evening": req.body.is_evening,
        "is_night": req.body.is_night
    };
    var fraction = await Fraction.createNewFraction(fractiondetails);
    if (!fraction) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": fraction
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Fraction registered successfully",
        "request": req.body,
        "result": fraction
    });
}

module.exports.get = async (req, res) => {
    var fraction = await Fraction.getFractionById(req.params.id);
    if (!fraction) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Fraction id not found, check it again",
            "request": req.body,
            "result": fraction
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Successfully get the data of fraction",
        "request": req.body,
        "result": fraction
    });
}

module.exports.update = async (req, res) => {
    var olddetails = await Fraction.getFractionById(req.params.id);
    if (!olddetails) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Fraction id not found, check it again",
            "request": req.body,
            "result": olddetails
        });
    }
    var newdetails = {
        "is_morning": req.body.is_morning,
        "is_afternoon": req.body.is_afternoon,
        "is_evening": req.body.is_evening,
        "is_night": req.body.is_night
    }
    var fraction = await Fraction.updateFraction(olddetails, newdetails);
    if (!fraction) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": fraction
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Fraction details successfully updated",
        "request": req.body,
        "result": fraction
    });
}

module.exports.deactivate = async (req, res) => {
    var fraction = await Fraction.getFractionById(req.params.id);
    if (!fraction) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Fraction id not found, check it again",
            "request": req.body,
            "result": fraction
        });
    }
    var newdetails = {
        "is_active": false
    }
    var fraction = await Fraction.updateFraction(fraction, newdetails);
    if (!fraction) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": fraction
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Fraction successfully deactivated",
        "request": req.body,
        "result": fraction
    });
}
module.exports.activate = async (req, res) => {
    var fraction = await Fraction.getFractionById(req.params.id);
    if (!fraction) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Fraction id not found, check it again",
            "request": req.body,
            "result": fraction
        });
    }
    var newdetails = {
        "is_active": true
    }
    var fraction = await Fraction.updateFraction(fraction, newdetails);
    if (!fraction) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "result": fraction
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Fraction successfully activated",
        "request": req.body,
        "result": fraction
    });
}
module.exports.remove = async (req, res) => {
    for (let index = 0; index < req.body.id.length; index++) {
        var fraction = await Fraction.getFractionById(req.body.id[index]);
        if (!fraction) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Fraction id not found, check it again",
                "request": req.body.id[index],
                "result": fraction
            });
        }
        var newdetails = {
            "deleted_at": Date.now()
        }
        var fraction = await Fraction.updateFraction(fraction, newdetails);
        if (!fraction) {
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": "Something went wrong !!! Try again",
                "request": req.body.id[index],
                "result": fraction
            });
        }
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "Fraction successfully deleted",
        "request": req.body,
        "result": fraction
    });
}
