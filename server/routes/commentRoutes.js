import express from "express";
import {
  getAllComments,
  postComment,
  deleteComment,
} from "../controller/commentController.js";

const router = express.Router();

router.get("/all", getAllComments);
router.post("/postComment", postComment);
router.delete("/:commentId", deleteComment);


export default router;
