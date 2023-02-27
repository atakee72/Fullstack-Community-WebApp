import express from "express";
import { getAllRecommendations } from "../controller/recommendationController.js";

const router = express.Router();

router.get("/all", getAllRecommendations);

export default router;
