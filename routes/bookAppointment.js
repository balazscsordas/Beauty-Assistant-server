import express from "express";
import { getSalonList, getServiceList, getFirstAppointmentList, postBookAppointmentData } from "../controllers/bookAppointment.js";

const router = express.Router();

router.get("/get-salon-list", getSalonList);
router.get("/get-service-list", getServiceList);
router.get("/get-first-appointment-list", getFirstAppointmentList);
router.post("/post-book-appointment-data", postBookAppointmentData);

export default router;