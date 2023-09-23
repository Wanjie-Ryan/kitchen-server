const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  updateVendorProfile,
  verifyToken
} = require("../../controllers/vendor/reg-log");
const VendorAuthMiddleware = require("../../middleware/vendormw");

router.route("/register").post(Register);
router.route("/login").post(Login);
router
  .route("/updatevendorprofile/:id")
  .patch(VendorAuthMiddleware, updateVendorProfile);
router.route('/verify').get(VendorAuthMiddleware,verifyToken)

module.exports = router;
