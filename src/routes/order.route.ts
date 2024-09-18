import express from "express";
import {
  createOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
  getPendingOrder,
  getOrdersOnYear,
  updateAllWithTotal
} from "../controllers/order.controller";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/getAllOrders", getAllOrder);
router.get("/getOneOrder/:id", getOneOrder);
router.get("/get-pending-order/:id", getPendingOrder);
router.get("/get-orders-on-year", getOrdersOnYear);
router.put("/updateOrder/:id", updateOrder);
router.put("/updateAllOrders", updateAllWithTotal);
router.delete("/deleteOrder/:id", deleteOrder);

export default router;