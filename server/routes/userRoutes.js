import express from "express";
import { getAllUsers, getUsersByRoleBadge } from "../controller/userController.js";
import userModel from "../models/userModel.js";


const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:roleBadge", getUsersByRoleBadge);

export default router;
