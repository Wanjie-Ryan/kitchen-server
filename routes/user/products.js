const express = require("express");
const router = express.Router();
const { GetAllProducts } = require("../../controllers/user/products");
const { PublicAccess } = require("../../middleware/usermw");

router.route("/userproducts").get(PublicAccess, GetAllProducts);

module.exports = router;
