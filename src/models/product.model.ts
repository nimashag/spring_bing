import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';

const MetaDataSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    quantity:{
        type: Number,
        required: true,
        min: 1,
    }
});

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    unit_price:{
        type: Number,
        required: true,
    },
    metadata: [MetaDataSchema],
    date: {
        type: [Date],
        default: Date.now,
    },
    description: {
        type: 'String',
        required: true,
    },
    category: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Category",
        required: true,
    },
    sub_category: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Subcategory",
        required: true,
    },
    images_path: {
        type: [String],
        required: true,
    }
}, { timestamps: true }); 

export const Product = mongoose.model<IProduct>('Product', ProductSchema);