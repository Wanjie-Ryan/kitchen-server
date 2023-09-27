const express = require("express");
const router = express.Router();
const { UserAuthMiddleware } = require("../../middleware/usermw");
const {
  createPayment,
  getAllPayments,
} = require("../../controllers/payment/pay");

router.route("/createpayment").post(createPayment);
router.route("/latestpayments").get(UserAuthMiddleware, getAllPayments);

module.exports = router;
