const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const validator = require("validator");



const vendorSchema = new mongoose.Schema({

    profile:{

        type:String
    },

    name:{
        type:String,
        required:[true, 'name of vendor is required']
    },

    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please provide a valid email",
        ],
  
        validate: [validator.isEmail, "Please provide a valid email"],
    },

    contact:{
        type: String,
        required: [true, "contact of user is required"],
        unique: true,
        match: [
          /^\+\d{12}$/,
          "Please provide a valid telephone number with + and country code",
        ],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 5,
      },
},{timestamps:true})


module.exports = mongoose.model('Vendor', vendorSchema)