import express, { Request, Response } from 'express';
import { Product } from '../models/product.model';
import { validateProductRequest } from '../validators/product.validator';

class ProductController {

    getAllProducts = async (request: express.Request, response: express.Response) => {
        try{
            const products = await Product.find();
            return response.status(200).json({data: products})
        } catch (error) {
            return response.status(500).json({ message: "Failed to retrieve products", error });
        }
    }

    getProduct = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const product = await Product.findById(id);
            if (product) {
                return response.status(200).json({ data: product });
            } else {
                return response.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            return response.status(500).json({ message: "Failed to retrieve product", error });
        }
    }

    createProduct = async (request: express.Request, response: express.Response) => {

        const validationError = validateProductRequest(request, response);
        if (validationError) return; // Stop execution if validation fails


        try{
            const {name, unit_price, metadata, description, category, sub_category, images_path } = request.body;
            const product = new Product({
                name,
                unit_price,
                metadata,
                description,
                category,
                sub_category,
                images_path,
            });
            await product.save();
            return response.status(201).json({message: "Product Created", data: product});
        } catch (error) {
            return response.status(500).json({ message: "Failed to create product", error });
        }
    }

    updateProduct = async (request: express.Request, response: express.Response) => {

        const validationError = validateProductRequest(request, response);
        if (validationError) return; // Stop execution if validation fails

        try {
            const { id } = request.params;
            const { name, unit_price, metadata, description, category, sub_category, images_path } = request.body;

            if (!name || !unit_price || !metadata || !description || !category || !sub_category || !images_path) {
                return response.status(400).json({ message: "All fields are required" });
            }

            const product = await Product.findById(id);
            if (product) {
                product.name = name;
                product.unit_price = unit_price;
                product.metadata = metadata;
                product.description = description;
                product.category = category;
                product.sub_category = sub_category;
                product.images_path = images_path;

                await product.save();
                return response.status(200).json({ message: "Product updated", data: product });
            } else {
                return response.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            return response.status(500).json({ message: "Failed to update product", error });
        }
    }

    deleteProduct = async (request: express.Request, response: express.Response) => {
        try {
            const { id } = request.params;
            const product = await Product.findByIdAndDelete(id);

            if (product) {
                return response.status(200).json({ message: "Product Deleted" });
            } else {
                return response.status(404).json({ message: "Product not found" });
            }
        } catch (error) {
            return response.status(500).json({ message: "Failed to delete product", error });
        }
    }

}

export default new ProductController();