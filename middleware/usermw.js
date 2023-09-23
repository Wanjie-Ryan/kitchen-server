const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const PublicAccess = async (req, res, next) => {
  const allowedRoutes = ["/api/user/products/userproducts"];
  if (allowedRoutes.includes(req.originalUrl)) {
    return next();
  }

  return res
    .status(StatusCodes.UNAUTHORIZED)
    .json({ msg: "Access Denied. Authentication required" });
};

const UserAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).send("No Token was provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.user_sec_key);
    const { userId } = decoded;
    req.user = { userId };
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(StatusCodes.UNAUTHORIZED).send("Invalid token");
    }

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Not authorized to access this route");
  }
};
module.exports = { PublicAccess, UserAuthMiddleware };
