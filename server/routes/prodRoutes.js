import express from "express";
const router = express.Router()
import { getProducts } from "../controllers/prodControllers.js";
import { verifyToken } from "../controllers/authController.js"
router.get("/", verifyToken, getProducts)

export { router as prodRouter };