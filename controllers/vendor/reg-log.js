const VendorModel = require('../../models/vendor/reg-log')
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const Register = async(req,res)=>{

    // try{


    // }
    // catch(err){

    // }

    res.send('register')
}

const Login = async(req,res)=>{

    res.send('login')
}

module.exports = {Register, Login}