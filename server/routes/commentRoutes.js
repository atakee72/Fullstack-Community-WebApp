import express from "express";
import { getAllComments } from "../controller/commentController.js";

const router = express.Router();

router.get("/all", getAllComments);

export default router;
