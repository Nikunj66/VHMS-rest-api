var Staff = require('../Models/Staff')
var stafflist = require('./Staff')
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/vhms', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: true });

var done = 0;
for (var i = 0; i < stafflist.length; i++) {
    stafflist[i].password = "$2a$10$uK.ErfcfsVHtf.DoEopZ0eFMm8m1fZo/rezCV3J2AlSvMbXK4XEi6"
    stafflist[i].role = "Doctor"

    new Staff(stafflist[i]).save(
        function (err, result) {
            done++;
            if (done === stafflist.length)
                exit();
        }
    );
}

function exit() {
    mongoose.disconnect();
}