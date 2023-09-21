const express = require('express')
const router = express.Router()
const {createProduct,GetAllProducts,updateProduct} = require('../../controllers/vendor/products')
const VendorAuthMiddleware = require("../../middleware/vendormw");


router.route('/createproduct').post(VendorAuthMiddleware,createProduct)
router.route('/getproducts').get(VendorAuthMiddleware,GetAllProducts)
router.route('/updateproduct/:id').patch(VendorAuthMiddleware, updateProduct)



module.exports = router