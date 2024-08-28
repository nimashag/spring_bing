import express from 'express';
import { Category } from '../models/category.model';
import { validateCategoryRequest } from '../validators/category.validator';

class CategoryController {

    createCategory = async (request: express.Request, response: express.Response) => {

        const validation = validateCategoryRequest(request);
        if(validation.statusCode !== 200) {
            return response.status(validation.statusCode).json({ error: validation.errorMessage });
        }
        try {
            const { name, description } = request.body;

            if (!name) {
                return response.status(400).json({ message: "Name is required" });
            }

            const category = new Category({
                name,
                description,
            });

            await category.save();
            return response.status(201).json({ message: "Category Created", data: category });
        } catch (error) {
            return response.status(500).json({ message: "Failed to create category", error });
        }
    }

    getAllCategories = async (request: express.Request, response: express.Response) => {
        try {
            const categories = await Category.find();
            return response.status(200).json({ data: categories });
        } catch (error) {
            return response.status(500).json({ message: "Failed to retrieve categories", error });
        }
    }


}

export default new CategoryController();