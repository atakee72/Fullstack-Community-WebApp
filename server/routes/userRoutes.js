import express from "express";
import { getAllUsers, getUsersByRoleBadge, imageUpload } from "../controller/userController.js";
import { multerUpload } from "../middlewares/multer.js";
import userModel from "../models/userModel.js";


const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:roleBadge", getUsersByRoleBadge);
router.post("/imageUpload", multerUpload.single("image"), imageUpload); //put multer in the middle :)

export default router;
