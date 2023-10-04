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

const getAllPayouts = async(req,res)=>{

    try{

        const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to receive payment" });
    }

    const decodedToken = jwt.verify(token, process.env.vendor_sec_key);
    const vendorId = decodedToken.vendorId;

    const OneVendor = await VendorModel.findById(vendorId);

    if (!OneVendor) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "Vendor does not exist" });
      }


    }
    catch(err){
        console.log(err)
    }
}

module.exports ={createPayout,getAllPayouts}