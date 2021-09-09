const { Patient, Appointment } = require("../Models/Model");
const Pagination = require("../Services/Pagination");

module.exports.list = async (req, res) => {
    var filter = { deleted_at: "" };
    if (req.body.staff_id) {
        var staff_id = req.body.staff_id;
        filter.staff_id = staff_id;
    }

    var date = req.body.date;
    filter.date = new Date(date);

    var sorting = "from_time"
    if (req.query.filter) {
        var like = JSON.parse(req.query.filter)
    }
    var appointmentlist = await Appointment.getAppointmentList({ filter, like, sorting });
    appointmentlist = await Pagination.paginate(appointmentlist, req.query.page);
    if (!appointmentlist) {
        return res.status(200).send({
            "success": false,
            "statusCode": 200,
            "message": "Something went wrong !!! Try again",
            "request": req.body,
            "pagination": appointmentlist.pagination,
            "result": appointmentlist.data
        });
    }
    return res.status(200).send({
        "success": true,
        "statusCode": 200,
        "message": "All appointments data successfully fatched",
        "filter": {},
        "pagination": appointmentlist.pagination,
        "result": appointmentlist.data
    });
}