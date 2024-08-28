import mongoose, { Schema } from 'mongoose';
import { ISubcategory } from '../interfaces/ISubcategory';

const subcategorySchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },

    description: {
        type: String
    },
    
}, { timestamps: true });

export const Subcategory = mongoose.model<ISubcategory>('Subcategory', subcategorySchema);