global.generateLikeObject = (like) => {
    for (key in like) {
        var item = like[key]
        if (key == "price") {
            like[key] = item
        }
        else if (new RegExp('.*id').test(key)) {
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
module.exports.Staff = require("./Staff")
module.exports.Patient = require("./Patient")
module.exports.Medicine = require("./Medicine")
module.exports.Treatment = require("./Treatment")
module.exports.Prescription = require("./Prescription")
module.exports.Slot = require("./Slot")
module.exports.Appointment = require("./Appointment")
module.exports.Fraction = require("./Fraction")
module.exports.MedicineAssign = require("./MedicineAssign")
module.exports.TreatmentAssign = require("./TreatmentAssign")