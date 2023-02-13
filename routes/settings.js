import express from "express";
import { getSalonData, saveSalonData, addFirstSalonData } from "../controllers/settings.js";

const router = express.Router();

router.get("/get-salon-data", getSalonData);
router.post("/add-first-salon-data", addFirstSalonData);
router.put("/save-salon-data", saveSalonData);

export default router;