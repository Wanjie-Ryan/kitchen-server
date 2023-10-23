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
    // console.log(err)
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
    // delete vendorLogin.contact;

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
    delete updateVendorObj.password;

    return res.status(StatusCodes.OK).json({
      msg: "Your Profile has been updated Successfully",
      updateVendorObj,
    });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const getSingleVendor = async (req, res) => {
  try {
    const { id: vendorId } = req.params;

    const getVendor = await VendorModel.findById(vendorId);

    if (getVendor.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Vendor cannot be found" });
    }

    const VendorObj = getVendor.toObject();
    // delete VendorObj._id;
    delete VendorObj.email;
    delete VendorObj.password;
    delete VendorObj.createdAt;
    delete VendorObj.updatedAt;
    delete VendorObj.profile;

    res.status(StatusCodes.OK).json({ msg: "Vendor Found is:", VendorObj });
  } catch (err) {
    // console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.vendor_sec_key);
      req.token = decoded;
      res.json({ type: "success" });
      // next()
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Token is bad" });
    }
  } catch (err) {
    // res.json({ type: 'error', message: 'Please authenticate', details: err })
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
};

module.exports = {
  Register,
  Login,
  updateVendorProfile,
  verifyToken,
  getSingleVendor,
};
