const { success, error } = require("../utils/responseWrapper");
const Category = require("../models/Category");
const Admin = require("../models/Admin");

const createCategory = async (req, res) => {
  try {
    const { categoryName, description, status } = req.body;

    if (!categoryName || !description || !status) {
      return res.send(error(400, "All fields are required"));
    }

    const existingCategory = await Category.findOne({ categoryName });

    if (existingCategory) {
      return res.send(error(409, "Category already exists"));
    }

    const adminId = req._id;
    const newCategory = await Category.create({
      categoryName,
      description,
      status,
      createdBy: adminId,
    });

    await Admin.findByIdAndUpdate(adminId, {
      $push: { categories: newCategory._id },
    });

    return res.json(success(200, { newCategory }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

// Update an existing category
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updates = req.body;

    // Find the category by id and update it
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true }
    );

    if (!updatedCategory) {
      // return res.status(404).json(error(404, "Category not found"));
      return red.send(error(404, "Category not found"));
    }

    return res.json(success(200, { updatedCategory }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

const getCategoryByAdmin = async (req, res) => {
  try {
    const adminId = req._id;

    // Find the admin by ID
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.send(error(404, "Admin not found"));
    }

    // Find categories created by the admin
    const categories = await Category.find({ createdBy: adminId });

    return res.json(success(200, { categories }));
  } catch (err) {
    return res.send(error(500, err.message));
  }
};

// Delete an existing category
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category by id and delete it
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      // return res.status(404).json(error(404, "Category not found"));
      return res.send(error());
    }

    res.json(success(200, "Category deleted successfully"));
  } catch (err) {
    console.error("Error deleting category:", err);
    res
      .status(500)
      .json(error(500, "An error occurred while deleting the category"));
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryByAdmin,
};
