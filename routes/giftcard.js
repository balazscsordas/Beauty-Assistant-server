import express from "express";
import { getGiftcardList, addNewGiftcard, editGiftcard, deleteGiftcard, getGiftcardDetails } from "../controllers/giftcard.js";

const router = express.Router();

router.get("/get-giftcard-list", getGiftcardList);
router.get("/get-giftcard-details/:id", getGiftcardDetails);
router.post("/add-new-giftcard", addNewGiftcard);
router.put("/edit-giftcard", editGiftcard);
router.delete("/delete-giftcard", deleteGiftcard);

export default router;