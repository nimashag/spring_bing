import mongoose from 'mongoose'

const SystemReviewSchema = new mongoose.Schema({
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
    }
}, { timestamps: true }); 

const SystemReview = mongoose.model('SystemReview', SystemReviewSchema)

export default SystemReview