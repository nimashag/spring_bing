import { Document, Schema } from 'mongoose';

export interface IProductReview extends Document {
    user_id: Schema.Types.ObjectId;  
    title: string;  
    description: string;  
    date: Date;  
    rating: 1 | 2 | 3 | 4 | 5;  
    status: 'pending' | 'solved' | 'in progress';  
    images_path?: string[];  
}
