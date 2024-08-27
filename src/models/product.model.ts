import mongoose from "mongoose";

const MetaData = new mongoose.Schema({
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
})

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    unit_price:{
        type: Number,
        required: true,
    },
    metadata: [MetaData],
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
    sub_category: { // there is a issue
        type: [String],
        required: true,
    },
    images_path: {
        type: [String],
        required: true,
    }
}, { timestamps: true }); 

const Product = mongoose.model('Product', ProductSchema)

export default Product