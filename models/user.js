"use strict";

const mongoose = require('mongoose');
const validator = require('validator');

const jwt = require('jsonwebtoken');

var UserList = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  // tokens: [{
  //   access: {
  //     type: String,
  //     required: true
  //   },
  //   token: {
  //     type: String,
  //     required: true
  //   },
  // }],

  Department:
  {
    type: String,
    enum: ['operations', 'quality']
    
  },

  position: {
    type: String,
    enum: ['Ops-lead', 'Ops', 'QC-lead', 'qc']
   
  },

  level: {
    type: String,
    enum: ['level1', 'level2']
    
  },

  empId: {
    type:String,
   
  }


});

//instance methods. Have access to every single doccument.
// UserList.methods.generateAuthTokens = function () {
//   var user = this;
//   var access = 'auth';
//   var token = jwt.sign({ _id: user._id.toHexString(), access }, abc123).toString();
//   user.tokens.push({access,token});

//  return user.save().then(() => {
//    return token;
//  });

// };


module.exports = mongoose.model('Employee_DB', UserList);