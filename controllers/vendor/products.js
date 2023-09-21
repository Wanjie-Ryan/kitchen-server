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

module.exports = { createProduct };
