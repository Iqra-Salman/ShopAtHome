import express from "express";
import authHandler from "../middleware/authHandler.js";
import {
  createOrder,
  getAllOrders,
  getOrderById,
} from "../controller/order.js";

const routes = express.Router();
routes.post("/", authHandler, createOrder);
routes.get("/:id", getOrderById);
routes.get("/", getAllOrders);

export default routes;
