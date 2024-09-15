import mongoose from "mongoose";
import { ICart } from "../interfaces/ICart";

const AddedProductSchema = new mongoose.Schema({
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

const CartSchema = new mongoose.Schema({
  user_id: {
    type: String, //just for now
    required: true,
  },
  added_products: [AddedProductSchema],
});

export const Cart = mongoose.model<ICart>("Cart", CartSchema);

export default Cart;
