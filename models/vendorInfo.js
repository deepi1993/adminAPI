var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var Vendor = new Schema({
    BasicInfo: {
        _id: {
            type: Schema.Types.ObjectId
        },
        garagename: {
            type: String,
            trim: true
        },
        registered: {
            type: Boolean
        },
        regtype: {
            type: String
        },
        cin: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        address1: {
            type: String,
            trim: true
        },
        latitude: {
            type: String,
            trim: true
        },
        longitude: {
            type: String,
            trim: true
        },
        landmark: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        pincode: {
            type: String,
            trim: true
        },
        gallery: [
            {
                type: String
            }
        ]
    },
    Contacts: [
        {
            primary: {
                type: Boolean
            },
            name: {
                type: String,
                trim: true
            },
            designation: {
                type: String,
                trim: true
            },
            phone: {
                type: String,
                trim: true
            },
            image: {
                type: String,
                trim: true
            },
            languages: [
                {
                    type: String
                }
            ]
        }
    ],
    Bank: {
        name: {
            type: String,
            trim: true
        },
        bankName: {
            type: String,
            trim: true
        },
        branchName: {
            type: String,
            trim: true
        },
        ifsc: {
            type: String,
            trim: true
        },
        acc: {
            type: String,
            trim: true
        },
        current: {
            type: Boolean
        },
        paytm: {
            type: String,
            trim: true
        },
        pan: {
            type: String,
            trim: true
        }
    },
    Timings: {
        weekDay_0: {
            Day: {
                type: String
            },
            isToday: {
                type: Boolean
            },
            wStart: {
                type: Date
            },
            wEnd: {
                type: Date
            },
            isRest: {
                type: Boolean
            },
            rStart: {
                type: Date
            },
            rEnd: {
                type: Date
            }
        },
        weekDay_1: {
            Day: {
                type: String
            },
            isToday: {
                type: Boolean
            },
            wStart: {
                type: Date
            },
            wEnd: {
                type: Date
            },
            isRest: {
                type: Boolean
            },
            rStart: {
                type: Date
            },
            rEnd: {
                type: Date
            }
        },
        weekDay_2: {
            Day: {
                type: String
            },
            isToday: {
                type: Boolean
            },
            wStart: {
                type: Date
            },
            wEnd: {
                type: Date
            },
            isRest: {
                type: Boolean
            },
            rStart: {
                type: Date
            },
            rEnd: {
                type: Date
            }
        },
        weekDay_3: {
            Day: {
                type: String
            },
            isToday: {
                type: Boolean
            },
            wStart: {
                type: Date
            },
            wEnd: {
                type: Date
            },
            isRest: {
                type: Boolean
            },
            rStart: {
                type: Date
            },
            rEnd: {
                type: Date
            }
        },
        weekDay_4: {
            Day: {
                type: String
            },
            isToday: {
                type: Boolean
            },
            wStart: {
                type: Date
            },
            wEnd: {
                type: Date
            },
            isRest: {
                type: Boolean
            },
            rStart: {
                type: Date
            },
            rEnd: {
                type: Date
            }
        },
        weekDay_5: {
            Day: {
                type: String
            },
            isToday: {
                type: Boolean
            },
            wStart: {
                type: Date
            },
            wEnd: {
                type: Date
            },
            isRest: {
                type: Boolean
            },
            rStart: {
                type: Date
            },
            rEnd: {
                type: Date
            }
        },
        weekDay_6: {
            Day: {
                type: String
            },
            isToday: {
                type: Boolean
            },
            wStart: {
                type: Date
            },
            wEnd: {
                type: Date
            },
            isRest: {
                type: Boolean
            },
            rStart: {
                type: Date
            },
            rEnd: {
                type: Date
            }
        }
    },
    Bike: {
        IDo: {
            type: Boolean
        },
        Services: [
            {
                ServiceName: {
                    type: String,
                    trim: true
                },
                IsService: {
                    type: Boolean
                },
                IsBackup: {
                    type: Boolean
                },
                ExtraPuncture: {
                    type: String
                },
                ratings: {
                    type: String
                },
                Charges: [
                    {
                        _id: false,
                        isEdit: {
                            type: Boolean
                        },
                        FuelType: {
                            type: String
                        },
                        DayCharge: {
                            type: String
                        },
                        NightCharge: {
                            type: String
                        },
                        BaseKM: {
                            type: String
                        },
                        ExtraDay: {
                            type: String
                        },
                        ExtraNight: {
                            type: String
                        },
                        VehicleType: [
                            {
                                type: String
                            }
                        ]
                    }
                ]
            }
        ]
    },
    Car: {
        IDo: {
            type: Boolean
        },
        Services: [
            {
                ServiceName: {
                    type: String,
                    trim: true
                },
                IsService: {
                    type: Boolean
                },
                IsBackup: {
                    type: Boolean
                },
                ExtraPuncture: {
                    type: String
                },
                ratings: {
                    type: String
                },
                Charges: [
                    {
                        _id: false,
                        isEdit: {
                            type: Boolean
                        },
                        FuelType: {
                            type: String
                        },
                        DayCharge: {
                            type: String
                        },
                        NightCharge: {
                            type: String
                        },
                        BaseKM: {
                            type: String
                        },
                        ExtraDay: {
                            type: String
                        },
                        ExtraNight: {
                            type: String
                        },
                        VehicleType: [
                            {
                                type: String
                            }
                        ]
                    }
                ]
            }
        ]
    },
    Documents: [
        {
            Type: {
                type: String,
                trim: true
            },
            Name: {
                type: String,
                trim: true
            },
            Img: {
                type: String,
                trim: true
            },
            created_DT: {
                type: Date
            }
        }
    ],
    onboarding_info: {
        date: {
            type: Date
        },
        onBoardingStatus: {
            type: String,
            enum: ['Saved', 'Visited', 'Submitted']
        },
        raUser: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        Signature: {
            type: String,
            trim: true
        },
        SpyImg: {
            type: String,
            trim: true
        },
        garageID: {
            type: String
        }
        // Comments: {
        //     type: String
        // }

    }
});


module.exports = mongoose.model("sp_master_info", Vendor);