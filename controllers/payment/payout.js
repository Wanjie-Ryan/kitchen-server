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
            message,
            success,
            status,
            amount,
            currency,
            payout_reference,
          });
          console.log(newPayout)

          return res
      .status(StatusCodes.OK)
      .json({ msg: "Payout has been received successfully", newPayout });


    }
    catch(err){
        console.log(err)
        res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
    }
}

module.exports ={createPayout}