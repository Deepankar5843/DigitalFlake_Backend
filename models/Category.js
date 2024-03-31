const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  // Reference to the admin who created this category
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  // Reference to items belonging to this category
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "item",
    },
  ],
});

module.exports = mongoose.model("category", categorySchema);
