import { Document, ObjectId } from 'mongoose';

export interface ISubcategory extends Document {
    name: string;
    category_id: ObjectId;
    description?: string;
}
