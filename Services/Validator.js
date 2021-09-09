const { Joi } = require('express-validation')

class Validator {
    static registrationValidations = {
        body: Joi.object({
            name: Joi.string().required().regex(/^[A-Z][a-z]+[ ][A-Z][a-z]+[ ][A-Z][a-z]+/),
            contactno: Joi.string().required().regex(/^\d{10}$/),
            username: Joi.string().required().email(),
            password: Joi.string().required(),
            role: Joi.string().required()
        })
    }

    static loginValidation = {
        body: Joi.object({
            username: Joi.string().required().email(),
            password: Joi.string().required(),
        })
    }

    static updateStaffMemberValidation = {
        body: Joi.object({
            name: Joi.string().required().regex(/^[A-Z][a-z]+[ ][A-Z][a-z]+[ ][A-Z][a-z]+/),
            contactno: Joi.string().required().regex(/^\d{10}$/),
            username: Joi.string().required().email(),
            password: Joi.string(),
            role: Joi.string().required()
        })
    }

    static patientValidation = {
        body: Joi.object({
            name: Joi.string().required().regex(/^[A-Z][a-z]+[ ][A-Z][a-z]+[ ][A-Z][a-z]+/),
            contactno: Joi.string().required().regex(/^\d{10}$/),
            address: Joi.string().required(),
            city: Joi.string().required(),
            other: Joi.string().allow("")
        })
    }

    static medicineValidation = {
        body: Joi.object({
            name: Joi.string().required(),
            price: Joi.string().required().regex(/^[0-9]*$/)
        })
    }

    static prescriptionValidation = {
        body: Joi.object({
            startdate: Joi.string().required(),
            days: Joi.string(),
            treatment_description: Joi.string(),
            diagnosis_details: Joi.string()
        })
    }

    static updatePrescriptionValidation = {
        body: Joi.object({
            startdate: Joi.string(),
            days: Joi.number(),
            treatment_description: Joi.string(),
            diagnosis_details: Joi.string()
        })
    }

    static slotValidation = {
        body: Joi.object({
            from_time: Joi.string().required().regex(/^(0[1-9]|1[0-2]):[0-5][0-9][ ](AM|PM)$/),
            to_time: Joi.string().required().regex(/^(0[1-9]|1[0-2]):[0-5][0-9][ ](AM|PM)$/)
        })
    }

    static appointmentValidation = {
        body: Joi.object({
            from_time: Joi.string().required().regex(/^(0[1-9]|1[0-2]):[0-5][0-9][ ](AM|PM)$/),
            to_time: Joi.string().required().regex(/^(0[1-9]|1[0-2]):[0-5][0-9][ ](AM|PM)$/),
            staff_id: Joi.string().required(),
            date: Joi.string().required()
        })
    }
}
module.exports = Validator