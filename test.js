var express = require('express');
var bodyParser = require('body-parser');


var { mongoose } = require('./db/mongoose');
var { Vendor } = require('./models/vendorInfo');



var app = express();


app.use(bodyParser.json());


// Vendor.find( {}, function(err, vendorInfo) {
//     if(err)
//     {
//         console.log(err);
//     }
//     if(vendorInfo === null)
//     {
//         console.log(invalid);
//     }
//     else 
//     {
//         console.log(vendorInfo);
//     }
// } )





// app.post('/vendorinfo', (req, res) => {
//     Vendor.find( {}, function(err, vendorInfo) {
//     if(err)
//     {
//         console.log(err);
//     }
//     if(vendorInfo === null)
//     {
//         console.log(invalid);
//     }
//     else 
//     {
//         console.log(vendorInfo);
//         res.send(vendorInfo);
//     }
// } )

// })




//  Vendor.findOne(({dbId:"id"}) , function(err , vendorInfo) {
//     if(err)
//     {
//         console.log("unable to find");
//     }
//     if(vehicle === null)
//     {
//         console.log("invalid id");
//     }
//     else
//     {
//     console.log(vendorInfo);
    
//     }
// })





app.post('/vendorinfo', (req, res) => {
    var id = (req.body.garage_id);
    var database;
    var dbId = database.onboarding_info.garage_id;
    
Vendor.findOne(({dbId:"id"}) , function(err , vendorInfo) {
    if(err)
    {
        console.log("unable to find");
    }
    if(vehicle === null)
    {
        console.log("invalid id");
    }
    else{
    console.log(vendor);
    res.send(vendorInfo);
    }
})


   
// });    
