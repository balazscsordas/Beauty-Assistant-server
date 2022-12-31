import express from "express";
import { getServiceList, addNewService } from "../controllers/service.js";

const router = express.Router();

router.get("/get-service-list", getServiceList);
router.post("/add-new-service", addNewService);

export default router;