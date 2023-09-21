const ProductsModel = require('../../models/vendor/products')
const VendorModel = require('../../models/vendor/reg-log')
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");


const createProduct = (req,res)=>{

    res.send('hey')
}

module.exports = {createProduct}