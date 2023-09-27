const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const cookie = require("cookie-parser");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const connectionDB = require("./connection/connection");

// IMPORT FOR VENDORS
const VendorRegLog = require("./routes/vendor/reg-log");
const Products = require("./routes/vendor/products");

//IMPORT FOR USERS

const userRegLog = require("./routes/user/reg-log");
const UserProducts = require("./routes/user/products");


//IMPORT FOR PAYMENTS

const payments = require('./routes/payment/pay')

app.use(helmet());
app.use(xss());
app.use(cookie());
app.use(express.json());
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowsMs: 15 * 60 * 100,
    max: 100,
  })
);
app.use(cors());

// ROUTES FOR THE VEDNORS

app.use("/api/vendor/auth", VendorRegLog);
app.use("/api/vendor/products", Products);

//ROUTES FOR THE USERS

app.use("/api/user/auth", userRegLog);
app.use("/api/user/products", UserProducts);

//ROUTES FOR PAYMENTS

app.use('/api/user/payments', payments)

app.get("/wake-up", (req, res) => {
  res.json({
    responseType: "success",
    message: "Server is awake",
  });
});

const DBConnection = async () => {
  try {
    await connectionDB(process.env.mongo_url);

    app.listen(port, () => {
      console.log(`server is running on port, ${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

DBConnection();
