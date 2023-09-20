const VendorModel = require('../../models/vendor/reg-log')
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const Register = async(req,res)=>{

    try{

        const { name, email, contact, password } = req.body;

        if (!name || !email || !contact  || !password) {
            return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ msg: "please fill all the fields" });
          }

          const newVendor =  await VendorModel.create(req.body)

          return res
          .status(StatusCodes.CREATED)
          .json({ msg: "Vendor created successfully" });



    }
    catch(err){

        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong, try again later" });
    }

    

}

const Login = async(req,res)=>{

    res.send('login')
}

module.exports = {Register, Login}