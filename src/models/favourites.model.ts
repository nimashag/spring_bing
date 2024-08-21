import mongoose from "mongoose";

const FavouriteSchema  = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    added_date: {
        type: Date,
        default: Date.now,
        required: true,
    }
}, { timestamps: true }); 

const Favourite = mongoose.model('Favourite', FavouriteSchema)

export default Favourite