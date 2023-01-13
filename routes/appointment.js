import express from "express";
import { addNewAppointment, deleteAppointment, getAppointmentList, editAppointment } from "../controllers/appointment.js";

const router = express.Router();

router.get("/get-appointment-list", getAppointmentList);
router.post("/add-new-appointment", addNewAppointment);
router.put("/edit-appointment", editAppointment);
router.delete("/delete-appointment", deleteAppointment);

export default router;