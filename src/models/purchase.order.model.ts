import mongoose from "mongoose";
import { IPurchaseOrder } from "../interfaces/IOrder";

const purchasedProductsSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
});

const purchaseOrderSchema = new mongoose.Schema({
  user_id: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref:"User",
    required: true,
  },
  orderProducts: [purchasedProductsSchema],
  purchase_date: {
    type: Date,
    default: Date.now,
  },
  billing_address: {
    type: String,
    required: true,
  },
  total_price : {
    type: Number,
    required: true,
  },
  order_status: {
    type: String,
    enum: [
      "pre-confirmed",
      "confirmed",
      "processing",
      "packing",
      "on-delivery",
      "delivered",
    ],
  },
});

const PurchaseOrder = mongoose.model<IPurchaseOrder>(
  "PurchaseOrder",
  purchaseOrderSchema
);

export default PurchaseOrder;
