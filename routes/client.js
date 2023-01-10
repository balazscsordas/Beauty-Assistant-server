import express from "express";
import { getClientList, getClientDetails, addNewClient, modifyClientData, deleteClient, addOptionNames } from "../controllers/client.js";

const router = express.Router();

router.get("/get-client-list", getClientList);
router.get("/get-client-details/:id", getClientDetails);
router.post("/add-option-names", addOptionNames);
router.post("/add-new-client", addNewClient);
router.put("/save-modified-client-data", modifyClientData);
router.delete("/delete-client", deleteClient);

export default router;