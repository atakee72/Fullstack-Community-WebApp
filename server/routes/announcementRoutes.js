import express from "express";
import { getAllAnnouncements } from "../controller/announcementController.js";

const router = express.Router();

router.get("/all", getAllAnnouncements);

export default router;
