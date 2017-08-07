var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://vikram:vikram@ds131492.mlab.com:31492/readyapi', {
    useMongoClient: true
});

var VehicleInfo = require('./models/vehicleInfo');
var VendorInfo = require('./models/vendorInfo');

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




//POST ROUTE FOR VENDOR INFO
app.post('/vendor_info', (req, res) => {

    var d = req.body.garage_id;
    console.log(d);


    //vendorInfo stores all the info of the garage with particular garage id.
    VendorInfo.findOne({ "onboarding_info.garageID": d.toString() }, function (err, vendorInfo) {
        if (err) {
            return res.status(500).json({
                isSuccess: false,
                message: 'An error occured',
                error: err
            })
        }
        if (vendorInfo === null) {
            console.log("invalid id");
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
                    data.operation_timings[i].shift = "24_hours";
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


            data.bike = {};

            function getinfo(id) {
                var vehicle = VehicleInfo.find({ "_id": id });
                var vehicleName = `${vehicle.vehicle.make}_${vehicle.vehicle.model}`;
                return vehicleName;

            }


            for (var i = 0; i < vendorInfo.Bike.Services.length; i++) {
                for (var j = 0; j < vendorInfo.Bike.Services[i].Charges.length; j++) {
                    for (var k = 0; k < vendorInfo.Bike.Services[i].Charges[j].VehicleType.length; k++) {

                        var vehicleName = [];
                        var id = vendorInfo.Bike.Services[i].Charges[j].VehicleType[k];
                        function getinfo(id) {
                            var vehicle = VehicleInfo.find({ "_id": id });
                            return vehicle;

                        }
                        VehicleInfo.find({ _id: id }, (err, vehicleinfo) => {
                            if (err) {
                                console.log('Not Found');
                            }
                            else {
                                if (vehicleinfo !== null) {
                                    vehicleName = `${vehicleinfo.vehicle.make}_${vehicleinfo.vehicle.model}`;
                                    //vendorInfo.Bike.Services[i-1].Charges[j-1].VehicleType[k]=vehicleName;

                                    console.log('DDD', makemodelArray);
                                    //return makemodelArray;
                                }
                                else {
                                    console.log("ID doesnt exists");
                                }

                            }
                        });
                    }
                }
            }

            data.bike = vendorInfo.Bike;

        }
    })
})



app.post('/vendor_status', (req, res) => {
    var id = req.body.garage_id.toString();
    console.log(id);
    var status = req.body.status.toString();
    console.log(status);
    var Comments = req.body.comment.toString();
    console.log(Comments);
    VendorInfo.findOneAndUpdate({ "onboarding_info.garageID": id }, { $push: { "onboarding_info.Comments": Comments }, $set: { "onboarding_info.onBoardingStatus": status } }, { new: true }, function (err, vendor) {
        if (err) {
            console.log("Something went wrong in updating the data");
        }
        res.send("Sucessfuly Updated Data");
    });

})

app.listen(port, () => {
    console.log(`started on port ${port}`);
});


module.exports = { app };  
