const router = require("express").Router();
const itemController = require("../controllers/itemController");
const requireUser = require("../middlewares/requireUser");

// Create a new item
router.post("/", requireUser, itemController.createItem);

router.put("/:id", requireUser, itemController.updateItem);

router.get("/:id", requireUser, itemController.getItems);

router.delete("/:id", requireUser, itemController.deleteItem);

module.exports = router;
