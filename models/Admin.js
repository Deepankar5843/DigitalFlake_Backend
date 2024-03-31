const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
      select: false,
    },

    name: {
      type: String,
      require: true,
    },

    bio: {
      type: String,
    },

    avatar: {
      publicId: String,
      url: String,
    },

    // Reference to categories created by this admin
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admin", adminSchema);
