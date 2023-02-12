import express from "express";
import { getAllTopics } from "../controller/topicController.js";

const router = express.Router();

router.get("/all", getAllTopics);

export default router;