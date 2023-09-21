const ProductsModel = require("../../models/vendor/products");
const VendorModel = require("../../models/vendor/reg-log");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req, res) => {
  try {
    const { productData } = req.body;

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to create a product" });
    }

    const decodedToken = jwt.verify(token, process.env.vendor_sec_key);
    const vendorId = decodedToken.vendorId;

    const OneVendor = await VendorModel.findById(vendorId);

    if (!OneVendor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Vendor does not exist,cannot proceed" });
    }

    const newProduct = await ProductsModel.create({
      createdBy: OneVendor._id,
      ...productData,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "The product was created successfully", newProduct });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const GetAllProducts = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to create a product" });
    }

    const decodedToken = jwt.verify(token, process.env.vendor_sec_key);
    const vendorId = decodedToken.vendorId;

    const OneVendor = await VendorModel.findById(vendorId);

    if (!OneVendor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Vendor does not exist,cannot proceed" });
    }

    const AllProducts = await ProductsModel.find({ createdBy: OneVendor._id });
    if (!AllProducts || AllProducts.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "You have not yet created a product" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "The products found are", AllProducts });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};


const updateProduct = async (req, res) => {

    try{

        const { productData } = req.body;

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: "You are not authorized to update a product" });
        }

        const decodedToken = jwt.verify(token, process.env.vendor_sec_key);
        const vendorId = decodedToken.vendorId;

        const OneVendor = await VendorModel.findById(vendorId);

        if (!OneVendor) {
            return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: "Vendor does not exist,cannot proceed" });
        }

        const OneProduct = await ProductsModel.findById(req.params.id);

        if (!OneProduct) {
            return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: "Product does not exist,cannot proceed" });
        }

        const updatedProduct = await ProductsModel.findByIdAndUpdate(req.params.id,productData,{new:true,})

        return res
        .status(StatusCodes.OK)
        .json({ msg: "The product was updated successfully", updatedProduct });



    }

    catch(err){

        res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong, please try again later" });

    }



}
module.exports = { createProduct, GetAllProducts,updateProduct };
