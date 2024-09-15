import express from 'express';
import {addCartItem, deleteFromCart }from '../controllers/cart.controller';
import {getAllCartItems} from '../controllers/cart.controller';
import {updateCartItem} from '../controllers/cart.controller';
import { deleteCart } from '../controllers/cart.controller';

const router = express.Router();

router.post("/add-cart", addCartItem);
router.get("/get-cart/:id", getAllCartItems);
router.put("/update-cart/:id", updateCartItem);
router.delete("/delete-cart/:id", deleteCart);
router.delete("/delete-user-cart/:id", deleteFromCart);

export default router;