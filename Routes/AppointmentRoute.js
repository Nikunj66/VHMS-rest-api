const express = require('express');

const { checkWebToken } = require('../Middlewares/checkWebToken');
const { validate } = require('express-validation');

const {
    list,
    listWithoutPagination,
    add,
    get,
    update,
    deactivate,
    activate,
    remove
} = require('../Controllers/AppointmentController');

const Validator = require('../Services/Validator');

const route = express.Router();


route.get(
    '/list/:pid?',
    [
        checkWebToken
    ],
    list
);
route.get(
    '/list/remove-pagination/:pid',
    [
        checkWebToken
    ],
    listWithoutPagination
);
route.post(
    '/add/:pid',
    [
        checkWebToken,
        validate(Validator.appointmentValidation, { context: false, statusCode: 400, keyByField: true }, {})
    ],
    add
);
route.put(
    '/get/:pid/:id',
    [
        checkWebToken
    ],
    get
);
route.patch(
    '/update/:pid/:id',
    [
        checkWebToken,
        validate(Validator.appointmentValidation, { context: false, statusCode: 400, keyByField: true }, {}),
    ],
    update
);
route.post(
    '/deactivate/:pid/:id',
    [
        checkWebToken
    ],
    deactivate
);
route.post(
    '/activate/:pid/:id',
    [
        checkWebToken
    ],
    activate
);
route.delete(
    '/delete/:pid',
    [
        checkWebToken
    ],
    remove
);
module.exports = route