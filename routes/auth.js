import express from "express";
import { verify } from "jsonwebtoken";
import { register, login, refresh, logout, getFirstName } from "../controllers/auth.js";

const router = express.Router();

router.post("/registration", register);
router.post("/login", login);
router.get("/refresh", refresh);
router.delete("/logout", logout);
router.get("get-firstName", verify, getFirstName);

export default router;