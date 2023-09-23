const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  updateUserProfile,
} = require("../../controllers/user/reg-log");
const {UserAuthMiddleware} = require("../../middleware/usermw");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/updateuserprofile/:id").patch(UserAuthMiddleware, updateUserProfile);

module.exports = router;
