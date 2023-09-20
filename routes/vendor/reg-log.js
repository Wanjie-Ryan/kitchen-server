const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  updateVendorProfile,
} = require("../../controllers/vendor/reg-log");
const VendorAuthMiddleware = require("../../middleware/vendormw");

router.route("/register").post(Register);
router.route("/login").post(Login);
router
  .route("/updatevendorprofile/:id")
  .patch(VendorAuthMiddleware, updateVendorProfile);

module.exports = router;
