import mongoose from "mongoose";

export interface IB2BOrder {
    supplier_id: mongoose.Schema.Types.ObjectId,
    product_id: mongoose.Schema.Types.ObjectId,
    date: Date,
    qty: number,
    unit_purchasing_price: number,
    totalPrice: number,
}

