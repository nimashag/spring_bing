import { Router } from 'express';
import ProductReviewController from '../controllers/review.controller';

const router = Router();

// CRUD operations
router.post('/', ProductReviewController.createReview);
router.get('/', ProductReviewController.getAllReviews);
router.get('/:id', ProductReviewController.getReviewById);
router.put('/:id', ProductReviewController.updateReview);
router.delete('/:id', ProductReviewController.deleteReview);

export default router;
