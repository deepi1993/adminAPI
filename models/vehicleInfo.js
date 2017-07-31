"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehicleList = new Schema({
    vehicle: {
        type: {
            type: String,
            trim: true
        },
        model: {
            type: String,
            trim: true
        },
        make: {
            type: String,
            trim: true
        },
        vehicle_sub_type: {
            type: String,
            trim: true
        }
    }
});

module.exports = mongoose.model('master_vehicleDB', VehicleList);