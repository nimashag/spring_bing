import express from 'express';
import { Subcategory } from '../models/sub.category.model';

class SubcategoryController {

    createSubcategory = async (request: express.Request, response: express.Response) => {
        try {
            const { name, category_id, description } = request.body;

            if (!name || !category_id) {
                return response.status(400).json({ message: "Name and category ID are required" });
            }

            const subcategory = new Subcategory({
                name,
                category_id,
                description,
            });

            await subcategory.save();
            return response.status(201).json({ message: "Subcategory Created", data: subcategory });
        } catch (error) {
            return response.status(500).json({ message: "Failed to create subcategory", error });
        }
    }

    getAllSubcategories = async (request: express.Request, response: express.Response) => {
        try {
            const subcategories = await Subcategory.find().populate('category_id', 'name');
            return response.status(200).json({ data: subcategories });
        } catch (error) {
            return response.status(500).json({ message: "Failed to retrieve subcategories", error });
        }
    }

}

export default new SubcategoryController();