const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUserMetadata,
  updateUserMetadata,
  deleteUser,
} = require("../controllers/userController");

// Protect routes (optional, comment out if testing open access)
const { requireAuth } = require("@clerk/express");

router.get("/", requireAuth(), getAllUsers);
router.get("/:id", requireAuth(), getUser);
router.post("/:id", requireAuth(), createUserMetadata);
router.put("/:id", requireAuth(), updateUserMetadata);
router.delete("/:id", requireAuth(), deleteUser);

module.exports = router;
