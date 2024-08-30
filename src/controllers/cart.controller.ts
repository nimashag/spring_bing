import express from 'express';
import Cart from '../models/cart.model';

export const addCartItem = async (req: express.Request, res: express.Response) => {
    try {
        const {user_id, added_products, color} = req.body;

        if (!Array.isArray(added_products) || added_products.some(item => !item.product_id || !item.quantity)) {
            return res.status(400).send({ message: "Invalid cart data" });
        }

        const newOrder = new Cart({user_id, added_products});

        await newOrder.save();

        res.status(201).send({message: "Cart item added successfully", newOrder});

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
}

export const getAllCartItems = async (req: express.Request, res: express.Response) => {
    try {

        const user_id = req.params.id;

        const cart = await Cart.findOne({user_id: user_id}).populate({
            path: 'added_products.product_id',
            model: 'Product',
        });

        if (!cart) {
            return res.status(200).send([]);
        }

        return res.status(200).send(cart);

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
}

export const updateCartItem = async (req: express.Request, res: express.Response) => {
    try {
        
        const userId = req.params.id;

        const {added_products} = req.body;

        const updatedCart  = await Cart.findOneAndUpdate(
            {user_id: userId},
            {added_products: added_products},
            { new: true, useFindAndModify: false } 
        )

        if(!updatedCart) {
            return res.status(404).send({message: "cart can not be found"});
        }

        return res.status(200).send(updatedCart);

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
}


export const deleteCart = async (req: express.Request, res: express.Response) => {
    try {
        
        const userId = req.params.id;

        const result = await Cart.findOneAndDelete({user_id: userId});

        if(!result) {
            return res.status(404).send({ message: 'Cart not found' });
        }
        else{
            return res.status(200).send({message: 'Cart item deleted successfully'});
        }


    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
}

export const deleteFromCart = async (req: express.Request, res: express.Response) => {
    try {
        
        

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send({ message: error.message });
        } else {
            res.status(500).send({ message: 'An unknown error occurred' });
        }     
    }
};