const PayOutModel = require("../../models/payment/payout");
const ProductsModel = require("../../models/vendor/products");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../models/user/reg-log");
const VendorModel = require("../../models/vendor/reg-log");

const createPayout = (req,res)=>{
    res.send('payout')
}

module.exports ={createPayout}