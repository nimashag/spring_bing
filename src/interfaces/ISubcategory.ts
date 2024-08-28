import { Document, ObjectId } from 'mongoose';

export interface ISubcategory extends Document {
    name: string;
    description?: string;
}
