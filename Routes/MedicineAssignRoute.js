const express = require('express');

const { checkWebToken } = require('../Middlewares/checkWebToken');

const {
    list,
    add,
    get,
    update,
    deactivate,
    activate,
    remove
} = require('../Controllers/MedicineAssignController');

const route = express.Router();


route.get(
    '/list/:pid/:aid',
    [
        checkWebToken
    ],
    list
);
route.post(
    '/add/:pid/:aid',
    [
        checkWebToken
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