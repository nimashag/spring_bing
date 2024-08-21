import express from 'express';
import SupplierController from '../controllers/SupplierController';

const router = express.Router();

router.get("/", SupplierController.getAllSupplier);
router.get("/:id", SupplierController.getSupplier);
router.post("/", SupplierController.createSupplier);
router.put("/:id", SupplierController.updateSupplier);
router.delete("/:id", SupplierController.deleteSupplier);

export default router;