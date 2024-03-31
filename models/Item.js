const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    packSize: {
      type: Number,
      required: true,
    },

    mrp: {
      type: Number,
      required: true,
    },

    productImage: {
      publicId: String,
      url: String,
    },

    status: {
      type: String,
      required: true,
    },

    // Reference to the category to which this item belongs
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },

    // Include categoryName field denormalized from category
    categoryName: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("item", itemSchema);
