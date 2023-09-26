const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  updateVendorProfile,
  verifyToken,
  getSingleVendor,
} = require("../../controllers/vendor/reg-log");
const VendorAuthMiddleware = require("../../middleware/vendormw");
const { UserAuthMiddleware } = require("../../middleware/usermw");

router.route("/register").post(Register);
router.route("/login").post(Login);
router
  .route("/updatevendorprofile/:id")
  .patch(VendorAuthMiddleware, updateVendorProfile);
router.route("/verify").get(VendorAuthMiddleware, verifyToken);
router.route("/singleVendor/:id").get(getSingleVendor);

module.exports = router;
