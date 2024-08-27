import express from 'express';
import SubcategoryController from '../controllers/sub.category.controller';

const router = express.Router();

router.get("/", SubcategoryController.getAllSubcategories);
router.post("/", SubcategoryController.createSubcategory);


export default router;