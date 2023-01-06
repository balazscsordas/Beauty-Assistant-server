import express from "express";
import { addNewAppointment, deleteAppointment, getAppointmentList, modifyAppointmentData } from "../controllers/appointment.js";

const router = express.Router();

router.get("/get-appointment-list", getAppointmentList);
router.post("/add-new-appointment", addNewAppointment);
router.put("/save-modified-appointment-data", modifyAppointmentData);
router.delete("/delete-appointment", deleteAppointment);

export default router;