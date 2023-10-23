const userModel = require("../../models/user/reg-log");
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

    const newUser = await userModel.create(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "User created successfully" });
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

    const userEmail = await userModel.findOne({ email });

    if (!userEmail) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "The Email Provided cannot be found" });
    }

    const correctPassword = await userEmail.checkpwd(password);

    if (!correctPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Incorrect password" });
    }

    const userLogin = userEmail.toObject();
    delete userLogin.password;
    delete userLogin.email;
    delete userLogin.contact;

    const token = jwt.sign(
      { userId: userLogin._id },
      process.env.user_sec_key,
      { expiresIn: "1d" }
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: `Login Successful`, userLogin, userToken: token });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { profile } = req.body;
    const { id: userId } = req.params;

    const updateUser = await userModel.findByIdAndUpdate(
      { _id: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `The user has not been found` });
    }

    const updateUserObj = updateUser.toObject();
    delete updateUserObj._id;
    delete updateUserObj.name;
    delete updateUserObj.email;
    delete updateUserObj.contact;
    delete updateUserObj.password;

    return res.status(StatusCodes.OK).json({
      msg: "Your Profile has been updated Successfully",
      updateUserObj,
    });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = { Register, Login, updateUserProfile };
