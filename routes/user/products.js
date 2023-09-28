const express = require("express");
const router = express.Router();
const { UserAuthMiddleware } = require("../../middleware/usermw");
const {
  GetAllProducts,
  GetSingleProduct,
} = require("../../controllers/user/products");
const { PublicAccess } = require("../../middleware/usermw");

router.route("/userproducts").get(PublicAccess, GetAllProducts);
router.route("usersingleproduct/:id").get(UserAuthMiddleware, GetSingleProduct);

module.exports = router;
