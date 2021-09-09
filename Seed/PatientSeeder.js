var Patient = require('../Models/Patient')
var patientlist = require('./Patient')
var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0.eewn5.mongodb.net/vhms',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:true });

var done=0;
for (var i=0; i<patientlist.length; i++){
    new Patient(patientlist[i]).save(
        function(err,result){
            done++;
            if(done === patientlist.length)
                exit();
        }
    );
}

function exit(){
    mongoose.disconnect();
}