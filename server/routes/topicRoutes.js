import express from "express";
import {
  getAllTopics,
  getTopicById,
  postTopic,
  updateLikes,
  deleteTopic,
} from "../controller/topicController.js";

const router = express.Router();

router.get("/all", getAllTopics);
router.get("/:topicId", getTopicById);
router.post("/post", postTopic);
// router.patch("/:topicId", updateTopic); //! PUT mu kullansak acaba?
router.delete("/:topicId", deleteTopic);
router.post("/:topicId", updateLikes);


export default router;
