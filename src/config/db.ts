import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri: string | undefined = process.env.URI;

if (!uri) {
    throw new Error("The URI environment variable is not set.");
}

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(uri);
        
        if (process.env.NODE_ENV !== 'test') {
            console.log('Database connection success');
        }
    } catch (err) {
        throw new Error('Database connection error: ' + (err as Error).message);
    }
};

export default connectDB;
