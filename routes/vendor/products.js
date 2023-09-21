const express = require('express')
const router = express.Router()
const {createProduct} = require('../../controllers/vendor/products')
const VendorAuthMiddleware = require("../../middleware/vendormw");


router.route('/createproduct').post(VendorAuthMiddleware,createProduct)



module.exports = router