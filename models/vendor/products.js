const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    image: {
      type: String,
      required: [true, "image is required"],
    },
    name: {
      type: String,
      required: [true, "product name is required"],
    },
    price: {
      type: String,
      required: [true, "product price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
