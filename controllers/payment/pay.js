const PaymentModel = require('../../models/payment/pay')
const ProductsModel = require('../../models/vendor/products')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require("http-status-codes");


const createPayment = async(req,res)=>{

    try{

        const {
            Message,
            Success,
            Status,
            Amount,
            transaction_reference,
            transaction_code,
          } = req.body;

          const newPayment = await PaymentModel.create({
            Message,
            Success,
            Status,
            Amount,
            transaction_reference,
            transaction_code,
          });
          console.log(newPayment)

          return res
          .status(StatusCodes.OK)
          .json({ msg: "Payment has been received successfully", newPayment });


    }

    catch(err){
        console.log(err)
        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong, please try again later" });
    
    }


}

const getAllPayments = async(req,res)=>{


    try{


    }

    catch(err){
        console.log(err)
    }
}


module.exports = {createPayment}