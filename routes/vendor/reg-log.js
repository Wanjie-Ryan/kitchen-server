const express = require("express");
const router = express.Router();
const { Register, Login,updateVendorProfile } = require("../../controllers/vendor/reg-log");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route('/updatevendorprofile/:id').patch(updateVendorProfile)

module.exports = router;
