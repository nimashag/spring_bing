import express from 'express';
import PurchaseOrderModel from '../models/purchase.order.model';
import {Product} from "../models/product.model";    
import {IPurchaseOrder} from '../interfaces/IOrder';

export const createOrder = async (req: express.Request, res: express.Response) => {


    try {
        const { user_id, orderProducts, billing_address, order_status } = req.body;

        let total_price = 0;

        const newOrder = new PurchaseOrderModel({
            user_id,
            orderProducts,
            billing_address,
            order_status
        });

        for (const orderProduct of orderProducts) {
            const { product_id, quantity, color, size } = orderProduct;


            const product = await Product.findById(product_id);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${product_id} not found` });
            }

            
            const metaDataItem = product.metadata.find(
                (meta) => meta.color === color && meta.size === size
            );
            
            if (!metaDataItem) {
                return res.status(400).json({ message: `No product variant found for color ${color} and size ${size}` });
            }

            
            if (metaDataItem.quantity < quantity) {
                return res.status(400).json({ message: `Not enough quantity available for product ${product.name} in color ${color} and size ${size}` });
            }

            
            /* metaDataItem.quantity -= quantity; */
            total_price += product.unit_price * quantity;
            console.log(typeof(product.unit_price));
            console.log(typeof(quantity));
            console.log(total_price);

            await product.save();
        }

        newOrder.total_price = total_price;
        
        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder);
        
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
};

export const getAllOrder = async (req: express.Request, res: express.Response) => {
    try {
        
        const orders = await PurchaseOrderModel.find().populate({
            path: 'orderProducts.product_id',
            model: 'Product', 
          });

        if (orders.length < 0) {
            return res.status(404).send({message: "No Orders Found"});
        }

        return res.status(200).send(orders);

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }   
};

export const getOneOrder = async (req: express.Request, res: express.Response) => {
    try {
        
        /* should check the findOne() method */

        const id = req.params.id;

        const order = await PurchaseOrderModel.findById(id).populate({
            path: 'orderProducts.product_id',
            model: 'Product', 
          });

        /* const order = await PurchaseOrderModel.findOne({order : req.params.id}); */ 
        if(!order){
            return res.status(404).send({message: "Order not found"});
        }
        else {

            /* order.orderProducts.forEach((orderProduct) => {
                const product = orderProduct.product_id;
                console.log(orderProduct.product_id._id);  // Access the product_id object
                product.metadata.forEach(async (meta) => {
                    
                    if(meta.color === orderProduct.color && meta.size === orderProduct.size){
                        meta.quantity -= orderProduct.quantity;

                        const product = await Product.findById(orderProduct.product_id._id);

                        console.log(product);
                        
                        
                    }
                    // Iterate through the metadata array
                    //console.log(`Color: ${meta.color}, Size: ${meta.size}, Quantity: ${meta.quantity}`);
                });
            });  */

            

            return res.status(200).send(order);
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });

        }
    }
};

export const updateOrder = async (req: express.Request, res: express.Response) => {
    try {
        
        const id = req.params.id;

        const order = await PurchaseOrderModel.findById(id);

        if(!order) {
            return res.status(404).send({message: "Order not found"});
        }
        else {
            order.user_id = req.body.user_id,
            order.orderProducts = req.body.orderProducts,
            order.purchase_date  = req.body.purchase_date,
            order.billing_address = req.body.billing_address,
            order.order_status = req.body.order_status 

            await order.save();
            return res.status(200).json({message: "order successfully updated", data: order})
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
};

export const deleteOrder = async (req: express.Request, res: express.Response) => {
    try {
        
        const id = req.params.id;

        const result = await PurchaseOrderModel.findByIdAndDelete(id);

        if(!result) {
            return res.status(400).send({ message: 'Order not found' });
        }
        else{
            return res.status(200).json({message: "Order deleted successfully"});
        }



    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
};