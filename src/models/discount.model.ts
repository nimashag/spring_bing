import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    discount_code: {
        type: String,
        required: true,
        unique: true,
    },
    discount_value: {
        type: Number,
        required: true,
    },
    valid_until: {
        type: Date,
        required: true,
    },
    applicable_categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
    }],
    applicable_products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }],
    status: {
        type: String,
        enum: ['active', 'expired', 'redeemed'],
        default: 'active',
    }
}, { timestamps: true });

const Discount = mongoose.model("Discount", discountSchema);

export default Discount;
