import mongoose from "mongoose";

const ProductReviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    title:{
        enum: ['complains', 'reviews'],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    rating: {
        enum: [1,2,3,4,5],
        required: true,
    },
    status: {
        default: 'pending',
        enum: ['pending', 'solved', 'onprogress']
    },
    images_path: {
        type: [String],
        required: true,
    }
}, { timestamps: true }); 

const ProductReview = mongoose.model('ProductReview', ProductReviewSchema)

export default ProductReview