var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

mongoose.connect('mongodb://vikram:vikram@ds131492.mlab.com:31492/readyapi', {
    useMongoClient: true
});


// var { mongoose } = require('./db/mongoose');
var VendorInfo = require('./models/vendorInfo');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/vendor_info', (req, res) => {

    var d = req.body.garage_id;
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
            for(var i = 0; i < vendorInfo.BasicInfo.gallery.length; i++)
            {
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


            //OPERATION TIMINGS
            data.operation_timings = {};
            data.operation_timings = vendorInfo.Timings;


            //DOCUMENTS
            data.documents = [];
            for(var i =0; i < vendorInfo.Documents; i++){
            data.documents[i] = {}
            data.documents[i].type= vendorInfo.Documents[i].Type;
            data.documents[i].name= vendorInfo.Documents[i].Name;
            data.documents[i].image= vendorInfo.Documents[i].Img;
            
            }



            //SERVICES

            data.car = {};
            data.car = vendorInfo.Car;
            data.bike = {};
            data.bike = vendorInfo.Bike;



            // CONTACT INFORMATION
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



            res.send(data);

        }
    })
})

app.listen(port, () => {
    console.log(`started on port ${port}`);
});


module.exports = { app };  
