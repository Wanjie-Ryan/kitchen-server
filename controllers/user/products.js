const ProductsModel = require("../../models/vendor/products");
const { StatusCodes } = require("http-status-codes");
const UserModel = require("../../models/user/reg-log");

const GetAllProducts = async (req, res) => {
  try {
    const userProducts = await ProductsModel.find({});

    if (userProducts.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No products found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Products found are:", userProducts });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const GetSingleProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;

    const singleProduct = await ProductsModel.findById(productId);

    if (!singleProduct) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Product not found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Product found is:", singleProduct });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const updateProduct = async(req,res)=>{

  try{

    const {quantity, boughtBy} = req.body
    const {id:productId} = req.params

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized" });
    }

    const decodedToken = jwt.verify(token, process.env.user_sec_key);
    const userId = decodedToken.userId;

    const OneUser = await UserModel.findById(userId);

    if (!OneUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User does not exist" });
    }


    const updateProduct = await ProductsModel.findByIdAndUpdate(productId, {quantity:quantity, boughtBy:OneUser._id}, {new:true})

    if(!updateProduct){
      return res.status(StatusCodes.NOT_FOUND).json({msg:'Product not found'})


    }

    res.status(StatusCodes.OK).json({msg:'Updated Product:',updateProduct});




  }
  catch(err){

    // console.log(err)

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });

  }


}

module.exports = { GetAllProducts, GetSingleProduct,updateProduct };
