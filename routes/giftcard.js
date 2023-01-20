import express from "express";
import { getGiftcardList, addNewGiftcard, editGiftcard, deleteGiftcard } from "../controllers/giftcard.js";

const router = express.Router();

router.get("/get-giftcard-list", getGiftcardList);
router.post("/add-new-giftcard", addNewGiftcard);
router.put("/edit-giftcard", editGiftcard);
router.delete("/delete-giftcard", deleteGiftcard);

export default router;