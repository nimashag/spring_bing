import express, { request } from 'express';
import { Product } from '../models/product.model';

class ProductController {

    getAllProducts = async (request: express.Request, response: express.Response) => {
        try{
            const products = await Product.find();
            return response.status(200).json({data: products})
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    getProduct = async (request: express.Request, response: express.Response) => {
        try{
            const {id} = request.params;
            const product = await Product.findById(id);
            return response.status(200).json({data: product})
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    createProduct = async (request: express.Request, response: express.Response) => {
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
            return response.status(201).json({message: "Product Created", data: product})
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    updateProduct = async (request: express.Request, response: express.Response) => {
        try{
            const {id} = request.params;
            const {name, unit_price, metadata, description, category, sub_category, images_path } = request.body;

            const product = await Product.findById(id);
            if(product){
                product.name = name;
                product.unit_price = unit_price;
                product.metadata = metadata;
                product.description = description;
                product.category = category;
                product.sub_category = sub_category;
                product.images_path = images_path;

                await product.save();
                return response.status(200).json({message: "Product updated", data: product})
            }
            return response.sendStatus(400);
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    deleteProduct = async (request: express.Request, response: express.Response) => {
        try{
            const {id} = request.params;
            await Product.findByIdAndDelete({_id: id});
            return response.status(200).json({message: "Product Deleted"})
        } catch (error) {
            return response.sendStatus(400);
        }
    }

}

export default new ProductController();