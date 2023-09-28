const ProductsModel = require("../../models/vendor/products");
const { StatusCodes } = require("http-status-codes");

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

const GetSingleProduct = async(req,res)=>{

  try{

    const {id:productId} = req.params

    const singleProduct = await ProductsModel.findById(productId)

    if(!singleProduct){
      return res.status(StatusCodes.NOT_FOUND).json({msg:"Product not found"})
    }

    return res.status(StatusCodes.OK).json({msg:"Product found is:",singleProduct})


  }
  catch(err){
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
}

module.exports = { GetAllProducts,GetSingleProduct };
