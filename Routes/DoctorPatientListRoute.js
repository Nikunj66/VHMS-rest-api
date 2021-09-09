const express = require('express');

const { checkWebToken } = require('../Middlewares/checkWebToken');

const {
    list
} = require('../Controllers/DoctorPatientListController');

const route = express.Router();


route.post(
    '/list',
    [
        checkWebToken
    ],
    list
);

module.exports = route