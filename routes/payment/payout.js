const express = require("express");
const router = express.Router();
const VendorAuthMiddleware = require("../../middleware/vendormw");
const {
  createPayout,
  getAllPayouts,
} = require("../../controllers/payment/payout");

router.route("/createpayout").post(VendorAuthMiddleware, createPayout);
router.route("/getpayouts").get(VendorAuthMiddleware, getAllPayouts);

module.exports = router;
