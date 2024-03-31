const Item = require("../models/Item");
const Category = require("../models/Category");
const { success, error } = require("../utils/responseWrapper");
const cloudinary = require("cloudinary").v2;

const createItem = async (req, res) => {
  try {
    const { categoryName, productName, packSize, productImage, mrp, status } =
      req.body;

    if (
      !productName ||
      !packSize ||
      !mrp ||
      !status ||
      !categoryName ||
      !productImage
    ) {
      return res.status(400).json(error(400, "All fields are not provided"));
    }

    const cloudImg = await cloudinary.uploader.upload(productImage, {
      folder: "postItemImg",
    });

    const existingCategory = await Category.findOne({ categoryName });
    if (!existingCategory) {
      return res.status(400).json(error(400, "Category not found"));
    }

    // Create a new item object
    const newItem = await Item.create({
      productName,
      packSize,
      productImage: {
        publicId: cloudImg.public_id,
        url: cloudImg.url,
      },
      mrp,
      status,
      category: existingCategory._id,
      categoryName,
    });

    // Add the item to the category's items array
    existingCategory.items.push(newItem._id);
    await existingCategory.save();

    // Send response with the newly created item
    res.status(201).json(success(201, newItem));
  } catch (err) {
    console.error("Error creating item:", err);
    res
      .status(500)
      .json(error(500, "An error occurred while creating the item"));
  }
};

const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updates = req.body;

    // Find the item by id
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json(error(404, "Item not found"));
    }

    // Find the category by name
    const category = await Category.findOne({ categoryName: updates.category });

    if (!category) {
      return res.status(400).json(error(400, "Category not found"));
    }

    item.productName = updates.productName;
    item.packSize = updates.packSize;
    item.productImage = updates.productImage;
    item.mrp = updates.mrp;
    item.status = updates.status;
    item.category = category._id;
    const updatedItem = await item.save();

    res.json(success(200, updatedItem));
  } catch (err) {
    console.error("Error updating item:", err);
    res
      .status(500)
      .json(error(500, "An error occurred while updating the item"));
  }
};

// get Item

const getItems = async (req, res) => {
  try {
    const adminId = req._id;

    console.log(adminId, "adminId");
    const categories = await Category.find({ createdBy: adminId });

    console.log("categories", categories);

    if (!categories) {
      return res.send(error(409, "Category not found"));
    }

    const categoryIds = categories.map((category) => category._id);

    const items = await Item.find({ category: { $in: categoryIds } });

    if (!items || items.length === 0) {
      return res.send(error(404, "No items found for this admin"));
    }

    return res.json(success(200, { items }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

// Delete an existing item
const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    // Find the item by id and delete it
    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json(error(404, "Item not found"));
    }

    res.json(success(200, "Item deleted successfully"));
  } catch (err) {
    console.error("Error deleting item:", err);
    res
      .status(500)
      .json(error(500, "An error occurred while deleting the item"));
  }
};

module.exports = {
  createItem,
  updateItem,
  deleteItem,
  getItems,
};
