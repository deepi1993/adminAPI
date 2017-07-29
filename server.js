var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://vikram:vikram@ds131492.mlab.com:31492/readyapi', {
    useMongoClient: true
});

var VendorInfo = require('./models/vendorInfo');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//HELPER FUNCTION FOR VALIDATION RETURNS AN ARRAY OF NON Null STRING KEYS
var validation = (obj) => {
    var d = Object.keys(obj);
    var i = 0;
    while(i < d.length) 
    {
        if(obj[d[i]].length == 0)
        {
           
            delete obj[d[i]];
           
        }
        i++;
    }
    return obj;
};


//POST ROUTE FOR VENDOR INFO
app.post('/vendor_info', (req, res) => {

//d = incoming garage id
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

            var data = [];
          

            //BASIC INFORMATION
            
            var basic_info = {};
            basic_info.garage_id = vendorInfo.onboarding_info.garageID;
            basic_info.garage_name = vendorInfo.BasicInfo.garagename;
            basic_info.kind_of_business;
            basic_info.address = vendorInfo.BasicInfo.address1;
            basic_info.latitude = vendorInfo.BasicInfo.latitude;
            basic_info.longitude = vendorInfo.BasicInfo.longitude;
            basic_info.email_id = vendorInfo.BasicInfo.email;
            basic_info.pincode = vendorInfo.BasicInfo.pincode;
            basic_info.gallery = [];
            for(var i = 0; i < vendorInfo.BasicInfo.gallery.length; i++)
            {
                basic_info.gallery[i] = vendorInfo.BasicInfo.gallery[i];
            }

            data.push(basic_info);
            
            //BANK INFORMATION
            var bank_info = {};
            bank_info.bank_name = vendorInfo.Bank.bankName;
            bank_info.branch_name = vendorInfo.Bank.branchName;
            bank_info.ifsc_code = vendorInfo.Bank.ifsc;
            bank_info.account_number = vendorInfo.Bank.acc;
            bank_info.current = vendorInfo.Bank.current;
            bank_info.account_holder = vendorInfo.Bank.name;
            bank_info.pancard_number = vendorInfo.Bank.pan;
            bank_info.paytm_number = vendorInfo.Bank.paytm;
            bank_info = validation(bank_info);
            data.push(bank_info);


            // //OPERATION TIMINGS
            // var operation_timings = [];
            // data.operation_timings = vendorInfo.Timings;


            //DOCUMENTS
            var documents = [];
            for(var i = 0; i < vendorInfo.Documents.length; i++){
            documents[i] = {};
            documents[i].type= vendorInfo.Documents[i].Type;
            documents[i].name= vendorInfo.Documents[i].Name;
            documents[i].image= vendorInfo.Documents[i].Img;
            
        }
        data.push(documents);




            //SERVICES

            var car = {};
            car = vendorInfo.Car;
            car = validation(car);
            data.push(car);
            var bike = {};           
            bike = vendorInfo.Bike;
            bike = validation(bike);
            data.push(bike);



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
