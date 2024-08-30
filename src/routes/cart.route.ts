import express from 'express';
import {addCartItem }from '../controllers/cart.controller';
import {getAllCartItems} from '../controllers/cart.controller';
import {updateCartItem} from '../controllers/cart.controller';
import { deleteCart } from '../controllers/cart.controller';
import {getPendingOrder} from "../controllers/order.controller"

const router = express.Router();

router.post("/add-cart", addCartItem);
router.get("/get-cart/:id", getAllCartItems);
router.put("/update-cart/:id", updateCartItem);
router.delete("/delete-cart/:id", deleteCart);

export default router;