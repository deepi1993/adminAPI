var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://vikram:vikram@ds131492.mlab.com:31492/readyapi', {
    useMongoClient: true
});

var VehicleInfo = require('./models/vehicleInfo');
var VendorInfo = require('./models/vendorInfo');



var getVehicleInfo = function(id) {
    var info = VehicleInfo.findOne({_id:id});
    return info;
}
var id = 
var query = getVehicleInfo(id);
console.log(query);

query.exec(function(err,result){
   if(err)
      return console.log(err);
  console.log(result);
});


// var Helper = require('./helper');
var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//HELPER FUNCTION FOR VALIDATION RETURNS AN ARRAY OF NON Null STRING KEYS
var validation = (obj) => {
    var d = Object.keys(obj);
    var i = 0;
    while (i < d.length) {
        if (obj[d[i]].length == 0) {

            delete obj[d[i]];

        }
        i++;
    }
    return obj;
};





// VehicleInfo.findOne({_id:id} , function(err,vehicleInfo)
// {
//     if(vehicleInfo===null)
//     {
//         console.log("ID doesnt exists");
//     }
//     else{
//         console.log(vehicleInfo);       
//     var vehicleName = `${vehicleInfo.vehicle.make}_${vehicleInfo.vehicle.model}`;
//     console.log(vehicleName);
//     }
// });


app.listen(port, () => {
    console.log(`started on port ${port}`);
});


module.exports = { app };  
