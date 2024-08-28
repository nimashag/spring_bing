import { Document,ObjectId } from "mongoose";
import { IProduct } from "./IProduct";

interface IPurchaseProducts {
  product_id: ObjectId;
  quantity: number;
  color: string;
  size: string;
}

export interface IPurchaseOrder extends Document {
  user_id: string; // just for now. soon we will change this to "user object"
  orderProducts: IPurchaseProducts[];
  purchase_date: Date;
  billing_address: string;
  total_price: number;
  order_status:
    | "pre-confirmed"
    | "confirmed"
    | "processing"
    | "packing"
    | "on-delivery"
    | "delivered";
}
