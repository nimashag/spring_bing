import express from "express";
import {
  createOrder,
  getAllOrder,
  getOneOrder,
  updateOrder,
  deleteOrder,
  getPendingOrder,
  getOrdersOnYear,
  updateAllWithTotal,
  getConfirmedOrder,
  confirmOrder,
  getOrdersByPage,
  updateOrderStatus,
} from "../controllers/order.controller";

const router = express.Router();

router.post("/create-order", createOrder);
router.get("/getAllOrders", getOrdersByPage);
router.get("/getOneOrder/:id", getOneOrder);
router.get("/get-pending-order/:id", getPendingOrder);
router.get("/get-orders-on-year", getOrdersOnYear);
router.put("/updateOrder/:id", updateOrder);
router.put("/updateAllOrders", updateAllWithTotal);
router.put("/confirmOrder/:id", confirmOrder);
router.put("/updateOrderStatus/:id", updateOrderStatus);
router.delete("/deleteOrder/:id", deleteOrder);
router.get("/get-confirmed-order/:id", getConfirmedOrder);

export default router;
