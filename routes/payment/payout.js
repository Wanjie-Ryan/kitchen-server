const express = require("express");
const router = express.Router();
const VendorAuthMiddleware = require("../../middleware/vendormw");
const { createPayout } = require("../../controllers/payment/payout");

router.route("/createpayout").post(VendorAuthMiddleware, createPayout);

module.exports = router;
