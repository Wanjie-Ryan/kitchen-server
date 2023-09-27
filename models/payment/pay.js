const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    Message: {
      type: String,
      required: true,
    },
    Success: {
      type: Boolean,
      required: true,
    },
    Status: {
      type: Number,
      required: true,
    },
    Amount: {
      type: String,
    },

    transaction_reference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
    transaction_code: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
