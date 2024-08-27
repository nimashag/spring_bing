import express from "express";
import {
  createOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/getAllOrders", getAllOrder);
router.get("/getOneOrder/:id", getOneOrder);
router.put("/updateOrder/:id", updateOrder);
router.delete("/deleteOrder/:id", deleteOrder);

export default router;