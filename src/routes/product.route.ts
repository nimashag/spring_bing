import express from 'express';
import ProductController from '../controllers/product.controller';

const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProduct);
router.post("/", ProductController.createProduct);
router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

export default router;