const PayOutModel = require("../../models/payment/payout");
const ProductsModel = require("../../models/vendor/products");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../models/user/reg-log");
const VendorModel = require("../../models/vendor/reg-log");

const createPayout = async(req,res)=>{
    try{
        const {
            message,
            success,
            status,
            amount,
            currency,
            payout_reference,
          } = req.body;

          const newPayout = await PayOutModel.create({
            Message,
            Success,
            Status,
            Amount,
            transaction_reference,
            transaction_code,
          });


    }
    catch(err){
        console.log(err)
    }
}

module.exports ={createPayout}