var express = require('express');
var bodyParser = require('body-parser');


var { mongoose } = require('./db/mongoose');
var { Vendor } = require('./models/vendorInfo');



var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());





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
});  

app.listen(port, () => {
    console.log(`started on port ${port}`);
});


module.exports = {app};  
