const VendorModel = require("../../models/vendor/reg-log");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Register = async (req, res) => {
  try {
    const { name, email, contact, password } = req.body;

    if (!name || !email || !contact || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "please fill all the fields" });
    }

    const newVendor = await VendorModel.create(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Vendor created successfully" });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Provide all the fields" });
    }

    const VendorEmail = await VendorModel.findOne({ email });

    if (!VendorEmail) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "The Email Provided cannot be found" });
    }

    const correctPassword = await VendorEmail.checkpwd(password);

    if (!correctPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Incorrect password" });
    }

    const vendorLogin = VendorEmail.toObject();
    delete vendorLogin.password;
    delete vendorLogin.email;
    delete vendorLogin.contact;

    const token = jwt.sign(
      { vendorId: vendorLogin._id },
      process.env.vendor_sec_key,
      { expiresIn: "1d" }
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: `Login Successful`, vendorLogin, vendorToken: token });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const updateVendorProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    const { id: vendorId } = req.params;

    const updateVendor = await VendorModel.findByIdAndUpdate(
      { _id: vendorId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateVendor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `The vendor has not been found` });
    }

    const updateVendorObj = updateVendor.toObject();
    delete updateVendorObj._id;
    delete updateVendorObj.name;
    delete updateVendorObj.email;
    delete updateVendorObj.contact;
    delete updateUserObj.password;

    return res.status(StatusCodes.OK).json({
      msg: "Your Profile has been updated Successfully",
      updateVendorObj,
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = { Register, Login, updateVendorProfile };
