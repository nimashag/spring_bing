import express from 'express';
import FAQ from '../models/faq.model';
import { validateFAQRequest } from '../validators/faq.validator';

class FAQController {

    // Create a new FAQ entry
    createFAQ = async (request: express.Request, response: express.Response) => {
        const validation = validateFAQRequest(request);
        if (validation.statusCode !== 200) {
            return response.status(validation.statusCode).json({ error: validation.errorMessage });
        }

        try {
            const { full_name, question, status, category } = request.body;

            const nameValidationRegex = /^[A-Za-z\s]+$/;
            if (!nameValidationRegex.test(full_name)) {
                return response.status(400).json({ message: "Name cannot contain numbers or special characters" });
            }

            if (!question) {
                return response.status(400).json({ message: "Question is required" });
            }

            const faq = new FAQ({
                full_name,
                question,
                category,
                status,
                answer: "", // Initially no answer
                answered_by: "" // Initially no answered_by
            });

            await faq.save();
            return response.status(201).json({ message: "FAQ Created", data: faq });
        } catch (error) {
            return response.status(500).json({ message: "Failed to create FAQ", error });
        }
    }

    // Get all FAQs
    getAllFAQs = async (request: express.Request, response: express.Response) => {
        try {
            const faqs = await FAQ.find();
            return response.status(200).json({ data: faqs });
        } catch (error) {
            return response.status(500).json({ message: "Failed to retrieve FAQs", error });
        }
    }

    // Get a single FAQ by ID
    getFAQById = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const faq = await FAQ.findById(id);
            if (!faq) {
                return response.status(404).json({ message: "FAQ not found" });
            }
            return response.status(200).json({ data: faq });
        } catch (error) {
            return response.status(500).json({ message: "Failed to retrieve FAQ", error });
        }
    }

    // Update an FAQ
    updateFAQ = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const { full_name, question, answer, status, answered_by } = request.body;

            if (!answer || !answered_by) {
                return response.status(400).json({ message: "Answer and answered_by are required" });
            }

            const faq = await FAQ.findById(id);
            if (!faq) {
                return response.status(404).json({ message: "FAQ not found" });
            }

            faq.full_name = full_name || faq.full_name;
            faq.question = question || faq.question;
            faq.answer = answer || faq.answer;
            faq.status = status || faq.status;
            faq.answered_by = answered_by || faq.answered_by;

            await faq.save();
            return response.status(200).json({ message: "FAQ Updated", data: faq });
        } catch (error) {
            return response.status(500).json({ message: "Failed to update FAQ", error });
        }
    }

    // Delete an FAQ by ID
    deleteFAQ = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const faq = await FAQ.findByIdAndDelete(id);
            if (faq) {
                return response.status(200).json({ message: "FAQ Deleted", data: faq });
            } else {
                return response.status(404).json({ message: "FAQ not found" });
            }
        } catch (error) {
            return response.status(500).json({ message: "Failed to delete FAQ", error });
        }
    }
}

export default new FAQController();
