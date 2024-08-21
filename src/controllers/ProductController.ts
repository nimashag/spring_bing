import express, { request } from 'express';
import { ProductModel } from '../models/Products';

class ProductController{

   
    getAllProducts = async (request: express.Request, response: express.Response) => {
        try{
            const products = await ProductModel.find();
            return response.status(200).json({data: products})
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    getProduct = async (request: express.Request, response: express.Response) => {
        try{
            const {id} = request.params;
            const product = await ProductModel.findById(id);
            return response.status(200).json({data: product})
        } catch (error) {
            return response.sendStatus(400);
        }
    }

    createProduct = async (request: express.Request, response: express.Response) => {
        try{
            const {fileName, productName, metaData, unitSalePrice, description, category } = request.body;
            const product = new ProductModel({
                fileName,
                productName,
                metaData,
                unitSalePrice,
                description,
                category
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
            const {fileName, productName, metaData, unitSalePrice, description, category } = request.body;

            const product = await ProductModel.findById(id);
            if(product){
                product.fileName = fileName;
                product.productName = productName;
                product.metaData = metaData;
                product.unitSalePrice = unitSalePrice;
                product.description = description;
                product.category = category;

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
            await ProductModel.findByIdAndDelete({_id: id});
            return response.status(200).json({message: "Product Deleted"})
        } catch (error) {
            return response.sendStatus(400);
        }
    }

}

export default new ProductController();