const { clerkClient } = require("@clerk/clerk-sdk-node");

// GET all users
const getAllUsers = async (req, res) => {
  const { data, totalCount } = await clerkClient.users.getUserList();
  res.json({ total: totalCount, users: data });
};

// GET one user by ID
const getUser = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "User not found" });
  }
};

// POST - add metadata (example use)
const createUserMetadata = async (req, res) => {
  try {
    const updated = await clerkClient.users.updateUserMetadata(req.params.id, {
      publicMetadata: req.body,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update metadata" });
  }
};

// PUT - update existing metadata
const updateUserMetadata = async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.params.id);
    const existing = user.publicMetadata || {};
    const updated = await clerkClient.users.updateUserMetadata(req.params.id, {
      publicMetadata: { ...existing, ...req.body },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update user" });
  }
};

// DELETE user
const deleteUser = async (req, res) => {
  try {
    await clerkClient.users.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUserMetadata,
  updateUserMetadata,
  deleteUser,
};
