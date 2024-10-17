import express from "express";
const router = express.Router()
import { checkout, getProducts } from "../controllers/prodControllers.js";
import { verifyToken } from "../controllers/authController.js"

router.get("/", verifyToken, getProducts)
router.post("/:customerId/checkout", verifyToken, checkout);
export { router as prodRouter };