import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true,
    },
    description: {
        type: String,
    }
}, { timestamps: true });

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

export default Subcategory;
