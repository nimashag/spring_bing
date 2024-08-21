import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    coupon_no: {
        type: String,
        required: true,
        unique: true, 
    }, 
    coupon_value: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'redeemed'], 
        default: 'active',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '30d', 
    },
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
