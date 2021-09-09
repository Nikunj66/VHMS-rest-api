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
} = require('../Controllers/StaffMemberController');

const Validator = require('../Services/Validator');

const route = express.Router();


route.get(
    '/list',
    [
        checkWebToken
    ],
    list
);
route.get(
    '/list/remove-pagination',
    [
        checkWebToken
    ],
    listWithoutPagination
);
route.post(
    '/add',
    [
        checkWebToken,
        validate(Validator.registrationValidations, { context: false, statusCode: 400, keyByField: true }, {})
    ],
    add
);
route.put(
    '/get/:id',
    [
        checkWebToken
    ],
    get
);
route.patch(
    '/update/:id',
    [
        checkWebToken,
        validate(Validator.updateStaffMemberValidation, { context: false, statusCode: 400, keyByField: true }, {}),
    ],
    update
);
route.post(
    '/deactivate/:id',
    [
        checkWebToken
    ],
    deactivate
);
route.post(
    '/activate/:id',
    [
        checkWebToken
    ],
    activate
);
route.delete(
    '/delete',
    [
        checkWebToken
    ],
    remove
);
module.exports = route