const mongoose = require("mongoose");

const payOutSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    Amount: {
      type: String,
    },

    payout_reference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("PayOut", payOutSchema);
