const express = require('express');
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require('cors');
const dotenv = require('dotenv');
const DB = require('./Services/DB');
const { AuthRoute, StaffMemberRoute, PatientRoute, MedicineRoute, PrescriptionRoute, SlotRoute, AppointmentRoute, FractionRoute, MedicineAssignRoute, TreatmentAssignRoute, TreatmentRoute, DoctorPatientListRoute } = require('./Routes/Route');
const { ValidationError } = require('express-validation');

dotenv.config({ path: './.env' });
const app = express();

DB.createConnection();

app.use(bodyParser.json());
app.use(cookieparser());
app.use(cors());

app.get('/', (req, res) => res.send("Home Page"));
app.use("/api", AuthRoute);
app.use("/api/staffmember", StaffMemberRoute);
app.use("/api/patient", PatientRoute);
app.use("/api/medicine", MedicineRoute);
app.use("/api/treatment", TreatmentRoute);
app.use("/api/prescription", PrescriptionRoute);
app.use("/api/slot", SlotRoute);
app.use("/api/appointment", AppointmentRoute);
app.use("/api/fraction", FractionRoute);
app.use("/api/medicineassign", MedicineAssignRoute);
app.use("/api/treatmentassign", TreatmentAssignRoute);
app.use("/api/doctorpatientlist", DoctorPatientListRoute);

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
    }
    return res.status(200).json(err)
})

const PORT = process.env.PORT;
const HOST = process.env.PROJECT_HOST;

app.listen(PORT, console.log(`http://${HOST}:${PORT}`));