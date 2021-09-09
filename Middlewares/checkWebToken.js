const jwt = require('jsonwebtoken');
module.exports.checkWebToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({
            "success": false,
            "statusCode": 403,
            "message": 'No token provided.',
            "request": req.body,
            "x-access-token": token
        });

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (err)
            return res.status(200).send({
                "success": false,
                "statusCode": 200,
                "message": 'Failed to authenticate token.',
                "request": req.body,
                "x-access-token": token
            });
        req.userId = decoded._id;
        req.userRole = decoded.role;
        next();
    });
};