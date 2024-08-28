import { Request, Response } from 'express';

export const validateProductRequest = (req: Request, res: Response) => {
    const { name, unit_price, metadata, description, category, sub_category, images_path } = req.body;

    // Check if all required fields are present
    if (!name || !unit_price || !metadata || !description || !category || !sub_category || !images_path) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate 'name' field
    if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: 'Product name must be a non-empty string' });
    }

    // Validate 'unit_price' field
    if (typeof unit_price !== 'number' || unit_price <= 0) {
        return res.status(400).json({ message: 'Product price must be a non-zero positive number' });
    }

    // Validate 'metadata' field
    if (!Array.isArray(metadata) || metadata.length === 0) {
        return res.status(400).json({ message: 'Metadata must be a non-empty array' });
    }
    for (const meta of metadata) {
        if (!meta.color || typeof meta.color !== 'string' || meta.color.trim().length === 0) {
            return res.status(400).json({ message: 'Metadata must contain a valid color' });
        }
        if (!meta.size || typeof meta.size !== 'string' || meta.size.trim().length === 0) {
            return res.status(400).json({ message: 'Metadata must contain a valid size' });
        }
        if (typeof meta.quantity !== 'number' || meta.quantity <= 0) {
            return res.status(400).json({ message: 'Metadata must contain a valid quantity (positive number)' });
        }
    }

    // Validate 'description' field
    if (typeof description !== 'string' || description.trim().length === 0) {
        return res.status(400).json({ message: 'Description must be a non-empty string' });
    }

    // Validate 'category' and 'sub_category' fields
    if (!Array.isArray(category) || category.length === 0) {
        return res.status(400).json({ message: 'Category must be a non-empty array' });
    }
    if (!Array.isArray(sub_category) || sub_category.length === 0) {
        return res.status(400).json({ message: 'Sub-category must be a non-empty array' });
    }

    // Validate 'images_path' field
    if (!Array.isArray(images_path) || images_path.length === 0) {
        return res.status(400).json({ message: 'Images path must be a non-empty array' });
    }

    // If all validations pass, proceed to the controller
    return null;  // Returning null to indicate no validation errors
};
