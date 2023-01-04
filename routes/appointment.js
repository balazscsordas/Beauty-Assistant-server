import express from "express";
import { addNewAppointment } from "../controllers/appointment.js";

const router = express.Router();

router.post("/add-new-appointment", addNewAppointment);

export default router;