const express = require('express')
const router = express.Router()
const {GetAllProducts} = require('../../controllers/user/products')

router.route('/userproducts').get(GetAllProducts)


module.exports = router