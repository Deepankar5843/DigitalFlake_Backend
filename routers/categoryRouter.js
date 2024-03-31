const router = require("express").Router();
const categoryController = require("../controllers/categoryController");
const requireUser = require("../middlewares/requireUser");

// Create a new category
router.post("/", requireUser, categoryController.createCategory);

router.put("/:id", requireUser, categoryController.updateCategory);

router.get("/:id", requireUser, categoryController.getCategoryByAdmin);

router.delete("/:id", requireUser, categoryController.deleteCategory);

module.exports = router;
