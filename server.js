var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://vikram:vikram@ds131492.mlab.com:31492/readyapi', {
    useMongoClient: true
});


const _ = require('lodash');

var VehicleInfo = require('./models/vehicleInfo');
var VendorInfo = require('./models/vendorInfo');
var User = require('./models/user');

var Helper = require('./helper');
var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var responseObj = {

};

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

//POST ROUTE FOR VENDOR INFO
app.post('/vendor_info', (req, res) => {

    var d = req.body.garage_id;
    console.log(d);
    //vendorInfo stores all the info of the garage with particular garage id.
    VendorInfo.findOne({ "onboarding_info.garageID": d.toString() }, function (err, vendorInfo) {
        
        if ( (err) || (vendorInfo === null)){
            responseObj.Success = false;
            responseObj.Message = "cant fetch the garage id";
            return res.status(200).send(JSON.stringify(responseObj));
        }
        
        else {

            //   array to be sent in the response
            var data = {};

            //BASIC INFORMATION
            data.basic_info = {};
            data.basic_info.garage_id = vendorInfo.onboarding_info.garageID;
            data.basic_info.garage_name = vendorInfo.BasicInfo.garagename;
            data.basic_info.kind_of_business;
            data.basic_info.address = vendorInfo.BasicInfo.address1;
            data.basic_info.latitude = vendorInfo.BasicInfo.latitude;
            data.basic_info.longitude = vendorInfo.BasicInfo.longitude;
            data.basic_info.email_id = vendorInfo.BasicInfo.email;
            data.basic_info.pincode = vendorInfo.BasicInfo.pincode;
            data.basic_info.gallery = [];
            for (var i = 0; i < vendorInfo.BasicInfo.gallery.length; i++) {
                data.basic_info.gallery[i] = vendorInfo.BasicInfo.gallery[i];
            }

            //BANK INFORMATION
            data.bank_info = {};
            data.bank_info.bank_name = vendorInfo.Bank.bankName;
            data.bank_info.branch_name = vendorInfo.Bank.branchName;
            data.bank_info.ifsc_code = vendorInfo.Bank.ifsc;
            data.bank_info.account_number = vendorInfo.Bank.acc;
            data.bank_info.current = vendorInfo.Bank.current;
            data.bank_info.account_holder = vendorInfo.Bank.name;
            data.bank_info.pancard_number = vendorInfo.Bank.pan;
            data.bank_info.paytm_number = vendorInfo.Bank.paytm;
            //validation after feeding the information so even if info comes we dont have to change the code
            data.bank_info = validation(data.bank_info);

            //OPERATION TIMINGS
            data.operation_timings = [];
            var i = 0;
            while (i < 7) {
                var e = `${i}`;
                var day = 'weekDay_' + e;
                data.operation_timings[i] = {};
                data.operation_timings[i].day = vendorInfo.Timings[day].Day;

                if (vendorInfo.Timings[day].isToday === false) {
                    data.operation_timings[i].Holiday = true;
                    i++;
                }
                else {

                    data.operation_timings[i].work_Start = vendorInfo.Timings[day].wStart.toString().slice(16, 24);
                    data.operation_timings[i].work_End = vendorInfo.Timings[day].wEnd.toString().slice(16, 24);
                    data.operation_timings[i].shift = Helper.Shift(data.operation_timings[i].work_Start, data.operation_timings[i].work_End);
                    if (vendorInfo.Timings[day].isRest = true) {
                        data.operation_timings[i].rest_Start = vendorInfo.Timings[day].rStart.toString().slice(16, 24);
                        data.operation_timings[i].rest_End = vendorInfo.Timings[day].rEnd.toString().slice(16, 24);
                    }
                    else {
                        data.operation_timings[i].rest = true;
                    }
                    i++;
                }
            }
            // DOCUMENTS
            data.documents = [];
            for (var i = 0; i < vendorInfo.Documents.length; i++) {
                data.documents[i] = {};
                data.documents[i].type = vendorInfo.Documents[i].Type;
                data.documents[i].name = vendorInfo.Documents[i].Name;
                data.documents[i].image = vendorInfo.Documents[i].Img;
                data.documents[i].Signature = vendorInfo.onboarding_info.Signature;
            }
            if (data.documents.length === 0) {
                delete data.documents;
            }


            data.contact_info = [];

            for (var i = 0; i < vendorInfo.Contacts.length; i++) {
                data.contact_info[i] = {};
                data.contact_info[i].name = vendorInfo.Contacts[i].name;
                data.contact_info[i].desgination = vendorInfo.Contacts[i].designation;
                data.contact_info[i].phone = vendorInfo.Contacts[i].phone;
                data.contact_info[i].images = vendorInfo.Contacts[i].image;
                data.contact_info.languages = [];
                data.contact_info[i].languages = vendorInfo.Contacts[i].languages;
            }
            if (data.contact_info.length === 0) {
                delete data.contact_info;
            }
            //SERVICES
            //bike

            
            VehicleInfo.find().then((vehicle) => {
                for (var i = 0; i < vendorInfo.Bike.Services.length; i++) {
                    delete vendorInfo.Bike.Services[i]._id;
                    for (var j = 0; j < vendorInfo.Bike.Services[i].Charges.length; j++) {
                        for (var k = 0; k < vendorInfo.Bike.Services[i].Charges[j].VehicleType.length; k++) {
                            var vehicleName;
                            var id = vendorInfo.Bike.Services[i].Charges[j].VehicleType[k];
                            var arrFound = vehicle.filter(function (item) {
                                return item._id == `${id}`;
                            });
                            if (arrFound.length > 0) {
                                var vhcl = arrFound[0];
                                vehicleName = `${vhcl.vehicle.make}_${vhcl.vehicle.model}`;
                                vendorInfo.Bike.Services[i].Charges[j].VehicleType[k] = vehicleName;
                            }
                            else {
                                vendorInfo.Bike.Services[i].Charges[j].VehicleType[k] = "make model not found";
                            }
                        }
                    }
                }
                data.bike = vendorInfo.Bike;
                //car
                if (vendorInfo.Car.Services.length != 0) {
                    for (var i = 0; i < vendorInfo.Car.Services.length; i++) {
                        for (var j = 0; j < vendorInfo.Car.Services[i].Charges.length; j++) {

                            for (var k = 0; k < vendorInfo.Car.Services[i].Charges[j].VehicleType.length; k++) {

                                var vehicleName;
                                var id = vendorInfo.Car.Services[i].Charges[j].VehicleType[k];
                                var arrFound = vehicle.filter(function (item) {
                                    return item._id == `${id}`;
                                });
                                if (arrFound.length > 0) {
                                    var vhcl = arrFound[0];
                                    vehicleName = `${vhcl.vehicle.make}_${vhcl.vehicle.model}`;
                                    vendorInfo.Car.Services[i].Charges[j].VehicleType[k] = vehicleName;
                                }
                            }
                        }
                    }
                    data.car = vendorInfo.Car;
                }
                res.send(data);
            }, (e) => {
                responseObj.Success = false;
                responseObj.Message = e;
                res.status(200).send(responseObj);
            });
        }
    })
})


// Route to change the Staus and Comment
app.post('/vendor_status', (req, res) => {
    var id = req.body.garage_id.toString();

    var status = req.body.status.toString();

    var Comments = req.body.comment.toString();
    
    
        VendorInfo.findOneAndUpdate({ "onboarding_info.garageID": id }, { $push: { "onboarding_info.Comments": Comments }, $set: { "onboarding_info.onBoardingStatus": status } }, { new: true }, function (err, vendor) {
            if (err) {
                return res.status(200).send(err);
            }
            res.status(200).send();
        });

})



// Route to register new user.

app.post('/new_user' , (req,res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then((user) => {
    res.send(user);
  }).catch((e) => {
    res.status(200).send(e);
  })
})



//Route to login


app.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password.toString();
    console.log(password);
    User.find({"email": email.toString()} , function(err, user) {
        console.log(user);
        if(err)
        {
            return res.status(200).send(err);
        }
        // console.log(typeof(user[0].password));
        // console.log(typeof(password));
        if(user[0].password === password)
        {
            res.status(200).send("Granted Access");
        }
        else{
            res.status(200).send("Password dont match");
        }
    });
});


app.listen(port, () => {
    console.log(`started on port ${port}`);
});


module.exports = { app };  
