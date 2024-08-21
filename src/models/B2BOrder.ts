import mongoose, { Document, Schema } from "mongoose";
import { IB2BOrder } from "../interfaces/IB2BOrder";

const B2BOrderSchema = new mongoose.Schema({
    supplier_id: {
        type: Schema.Types.ObjectId,
        ref: 'Supplier',  
        required: true,
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',  
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    unit_purchasing_price: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export const B2BOrderModel = mongoose.model<IB2BOrder & Document>('B2B_Order', B2BOrderSchema);
