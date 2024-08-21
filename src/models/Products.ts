import mongoose, {Document} from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const MetaDataSchema = new mongoose.Schema({
    color: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    }
}, {_id: false});


const CategorySchema = new mongoose.Schema ({
    sub_cat: {
        type: [String],
        required: true,
    }
}, {_id: false});


const ProductSchema = new mongoose.Schema ({
    productName: {
        type: String,
        required: true,
    },
    metaData: {
        type: [MetaDataSchema],
        required: true,
    },
    unitSalePrice: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: CategorySchema,
        required: true,
    }
}, {
    timestamps: true,
});

export const Product = mongoose.model<IProduct & Document>('Product', ProductSchema);
