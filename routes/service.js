import express from "express";
import { getServiceList, getServiceDetails, addNewService, modifyServiceData, deleteService, getCategoryList } from "../controllers/service.js";

const router = express.Router();

router.get("/get-service-list", getServiceList);
router.get("/get-category-list", getCategoryList);
router.get("/get-service-details/:id", getServiceDetails);
router.post("/add-new-service", addNewService);
router.put("/save-modified-service-data", modifyServiceData);
router.delete("/delete-service", deleteService);

export default router;