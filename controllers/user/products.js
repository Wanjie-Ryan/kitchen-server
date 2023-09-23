const ProductsModel = require('../../models/vendor/products')
const { StatusCodes } = require('http-status-codes')



const GetAllProducts = (req,res)=>{

    res.send('get all products')
}

module.exports = {GetAllProducts}