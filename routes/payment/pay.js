const express = require("express");
const router = express.Router();
const { UserAuthMiddleware } = require("../../middleware/usermw");
const VendorAuthMiddleware = require('../../middleware/vendormw')
const {
  createPayment,
  getAllPayments,
  getBuyers
} = require("../../controllers/payment/pay");

router.route("/createpayment").post(createPayment);
router.route("/latestpayments").get(UserAuthMiddleware, getAllPayments);
router.route('/getbuyers/:id').get(VendorAuthMiddleware,getBuyers)

module.exports = router;
