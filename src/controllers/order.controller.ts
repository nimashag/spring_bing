import express from 'express';
import PurchaseOrderModel from '../models/purchase.order.model';
import {IPurchaseOrder} from '../interfaces/IOrder';

export const createOrder = async (req: express.Request, res: express.Response) => {
    try {

        const {
            user_id,
            orderProducts,
            purchase_date,
            billing_address,
            order_status,
        } = req.body as IPurchaseOrder

        const order = {
            userId : user_id,
            orderProducts : orderProducts,
            purchase_date  :purchase_date,
            billing_address : billing_address,
            order_status : order_status
        }

        
        const newOrder = await PurchaseOrderModel.create(order);
        res.status(201).send(newOrder);
        
        
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
        
        const orders = await PurchaseOrderModel.find();

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

        const order = await PurchaseOrderModel.findById(id);

        /* const order = await PurchaseOrderModel.findOne({order : req.params.id}); */

        if(!order){
            return res.status(404).send({message: "Order not found"});
        }
        else {
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
