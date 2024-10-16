import express from "express";
import { getDetails, login, signup } from "../controllers/authController.js";

const router = express.Router()

router.post("/signup", signup);
router.post("/login", login);
router.get("/:userId", getDetails)

export { router as authRouter };