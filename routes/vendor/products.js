const express = require('express')
const router = express.Router()
const {createProduct,GetAllProducts,updateProduct,deleteProduct} = require('../../controllers/vendor/products')
const VendorAuthMiddleware = require("../../middleware/vendormw");


router.route('/createproduct').post(VendorAuthMiddleware,createProduct)
router.route('/getproducts').get(VendorAuthMiddleware,GetAllProducts)
router.route('/updateproduct/:id').patch(VendorAuthMiddleware, updateProduct)
router.route('/deleteproduct/:id').delete(VendorAuthMiddleware, deleteProduct)



module.exports = router