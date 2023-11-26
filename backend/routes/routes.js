import express from "express";
import { createProduct, deleteProduct, editProduct, getAll, getAllByid } from "../controller/products.js";
import authHandler, { adminHandler } from "../middleware/authHandler.js";
const router = express.Router();


router.get("/", getAll);
router.get("/:id", getAllByid);
router.post("/", authHandler,adminHandler,createProduct)
router.put("/:id",authHandler,adminHandler, editProduct)
router.delete("/:id",authHandler,adminHandler, deleteProduct)


export default router;
