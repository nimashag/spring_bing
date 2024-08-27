import { Document } from "mongoose";
import { IProduct } from "./IProduct";

interface IPurchaseProducts {
  product_id: IProduct;
  quantity: Number;
  color: String;
  size: String;
}

export interface IPurchaseOrder extends Document {
  user_id: String; // just for now. soon we will change this to "user object"
  orderProducts: IPurchaseProducts[];
  purchase_date: Date;
  billing_address: String;
  order_status:
    | "pre-confirmed"
    | "confirmed"
    | "processing"
    | "packing"
    | "on-delivery"
    | "delivered";
}
