const { validate } = require('express-validation');
const { checkFirstMember } = require('../Middlewares/checkFirstMember');

const express = require('express');
const {
    registerStaffmember,
    autheticateStaffMember
} = require('../Controllers/AuthController');
const Validator = require('../Services/Validator');

const route = express.Router();

route.post(
    '/login',
    [
        validate(Validator.loginValidation, { context: false, statusCode: 400, keyByField: true }, {})
    ],
    autheticateStaffMember
);
route.post(
    '/registration',
    [
        checkFirstMember,
        validate(Validator.registrationValidations, { context: false, statusCode: 400, keyByField: true }, {})
    ],
    registerStaffmember);

module.exports = route