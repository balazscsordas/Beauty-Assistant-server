import express from "express";
import { getFirstFetchStats } from "../controllers/statistics.js";

const router = express.Router();

router.get("/get-first-fetch-stats", getFirstFetchStats);

export default router;