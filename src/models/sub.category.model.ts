import mongoose, { Schema } from 'mongoose';
import { ISubcategory } from '../interfaces/ISubcategory';

const subcategorySchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },

    category_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },

    description: String,
    
}, { timestamps: true });

export const Subcategory = mongoose.model<ISubcategory>('Subcategory', subcategorySchema);