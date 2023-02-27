import express from "express";
import {
  getAllUsers,
  getProfile,
  getUsersByRoleBadge,
  imageUpload,
  login,
  signup,
  updateUser,
} from "../controller/userController.js";
import jwt from "../middlewares/jwt.js";
import { multerUpload } from "../middlewares/multer.js";
import userModel from "../models/userModel.js";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/userProfile", jwt, getProfile);
router.get("/:roleBadge", getUsersByRoleBadge);
router.post("/imageUpload", multerUpload.single("image"), imageUpload);
router.post("/signup", signup);
router.post("/login", login);

// router.post("/:id", updateUser); //todo  TODO:  this has to be checked!

router.get("/:id", async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
