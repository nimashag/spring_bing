import mongoose from 'mongoose';
import { IProductReview } from '../interfaces/IReview';

const ProductReviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: false,
    },
    title: {
        type: String,
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
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'solved', 'onprogress'],
    },
    images_path: {
        type: [String],
        required: false, // Adjust as needed
    }
}, { timestamps: true });

//Adding indexes 
ProductReviewSchema.index({ date: 1 });     
ProductReviewSchema.index({ rating: 1 });  
ProductReviewSchema.index({ status: 1 });   

const ProductReview = mongoose.model<IProductReview>('ProductReview', ProductReviewSchema);

export default ProductReview;
