import express from "express";
import { register, login, refresh, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/registration", register);
router.post("/login", login);
router.get("/refresh", refresh);
router.delete("/logout", logout);

export default router;