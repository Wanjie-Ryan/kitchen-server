const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const VendorAuthMiddleware =  async(req,res,next)=>{

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).send("No Token was provided");
      }

      const token = authHeader.split(" ")[1];

      try{

        const decoded = jwt.verify(token, process.env.vendor_sec_key);
        const { vendorId } = decoded;
        req.user = { vendorId };
        next();


      }
      catch(err){
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(StatusCodes.UNAUTHORIZED).send("Invalid token");
          }
      
          return res
            .status(StatusCodes.UNAUTHORIZED)
            .send("Not authorized to access this route");
        }
      }
module.exports = VendorAuthMiddleware