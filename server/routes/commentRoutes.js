import express from "express";
import {
  getAllComments,
  postComment,
} from "../controller/commentController.js";

const router = express.Router();

router.get("/all", getAllComments);
router.post("/postComment", postComment);

export default router;
