import express from "express";
import {
  getAllTopics,
  getTopicById,
  postTopic,
  // updateTopic,
  deleteTopic,
} from "../controller/topicController.js";

const router = express.Router();

router.get("/all", getAllTopics);
router.get("/:topicId", getTopicById);
router.post("/post", postTopic);
// router.patch("/:topicId", updateTopic); //! PUT mu kullansak acaba?
router.delete("/:topicId", deleteTopic);

export default router;
