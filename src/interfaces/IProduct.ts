import { Document, ObjectId } from 'mongoose';

interface IMetaData {
    color: string;
    size: string;
    quantity: number;
}

export interface IProduct extends Document {
    name: string;
    unit_price: number;
    metadata: IMetaData[];
    date: Date[];
    description: string;
    category: ObjectId[];
    sub_category: string[];
    images_path: string[];
}
