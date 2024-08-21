import mongoose from "mongoose";

const AddedProductSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    addedDate: {
        type: Date,
        default: Date.now
    }
})

const CartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    added_products: [AddedProductSchema], 
})

const Cart= mongoose.model('Cart',  CartSchema)

export default Cart