import express from 'express';
import faqController from '../controllers/faq.controller';

const router = express.Router();

// Get all FAQs
router.get("/", faqController.getAllFAQs);

// Get Single FAQ
router.get("/:id", faqController.getFAQById);

// Create a new FAQ
router.post("/", faqController.createFAQ);

// Update an FAQ by ID
router.put("/:id", faqController.updateFAQ);


// Delete an FAQ by ID
router.delete("/:id", faqController.deleteFAQ);

export default router;
