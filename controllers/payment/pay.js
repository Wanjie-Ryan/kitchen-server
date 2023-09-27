const PaymentModel = require("../../models/payment/pay");
const ProductsModel = require("../../models/vendor/products");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../models/user/reg-log");

const createPayment = async (req, res) => {
  try {
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
    // console.log(newPayment);

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Payment has been received successfully", newPayment });
  } catch (err) {
    // console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to do a payment" });
    }

    const decodedToken = jwt.verify(token, process.env.user_sec_key);

    const userId = decodedToken.userId;
    console.log(userId);

    const findOneUser = await UserModel.findById(userId);

    if (!findOneUser) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    const latestPayment = await PaymentModel.findOne({})
      .sort({ createdAt: -1 })
      .exec();

    if (!latestPayment) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No payments found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Latest Payment is:", latestPayment });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = { createPayment, getAllPayments };
