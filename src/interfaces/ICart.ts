import { Document, ObjectId } from "mongoose";

interface AddedProduct{
    product_id: ObjectId;
    quantity: number;
    color: string;
    size: string;
}


export interface ICart extends Document{
    user_id: string; // for now
    added_products: AddedProduct[];
}