var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://vikram:vikram@ds131492.mlab.com:31492/readyapi', {
    useMongoClient: true
});

var VehicleInfo = require('./models/vehicleInfo');
var VendorInfo = require('./models/vendorInfo');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// first method
function getinfo(id)
{
    var vehicle = VehicleInfo.find({"_id":id});
    if(vehicle === null)
    {
        console.log("id doesnt match");
    }    
    else return vehicle;

}
 d = {};
var vehicleinfo = getinfo("5970d1afa315c90011b87e26");
vehicleinfo.exec(function(err,result) 
{
    if(err)
    {
        return console.log("An error occured");
    }
    else 
    {
        d = result;
        console.log(d);
    }
})

var sec = getinfo("5970d1afa315c90011b87e26");
sec.exec(function(err,result)
{
    if(err)
    {
        return console.log("error in second call back")
    }
    else{
        console.log(result[0].vehicle.make);
    }
})


// for vehicle make model






function runSequentially (callback) {  
  fastFunction((err, data) => {
    if (err) return callback(err)
    console.log(data)   // results of a

    slowFunction((err, data) => {
      if (err) return callback(err)
      console.log(data) // results of b

      // here you can continue running more tasks
    })
  })
}


async.waterfall([fastFunction, slowFunction], () => {  
  console.log('done')
})




remotedb.allDocs().then(function (resultOfAllDocs) {
  return localdb.put();
}).then(function (resultOfPut) {
  return localdb.get();
}).then(function (resultOfGet) {
  return localdb.put();
}).catch(function (err) {
  console.log(err);
});



var Promise = require('promise');
router.post('/Registration',function(req,res) {
    function username() {
        console.log("agyaaa");
        return new Promise(function(resolve,reject) {
            User.findOne({"username":req.body.username}, function(err,user) {
                if (err) {
                    reject(err)
                } else {
                    console.log("yaha b agyaaa");
                    var errorsArr = [];
                    errorsArr.push({"msg":"Username already been taken."});
                    resolve(errorsArr);
                }

            });
        });
    }
    username().then(function(data) {
        console.log(data);
    });
});


