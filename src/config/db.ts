import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url: string | undefined = process.env.URL;
if (!url) {
    throw new Error("The MongoDB URI environment variable is not set.");
}

const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(url, {
            dbName: "spring-bing",
        });

        console.log('Database connection success');
    } catch (err) {
        console.error('Database connection error: ', err);
        throw new Error('Database connection error: ' + (err as Error).message);
    }
};

export default connectDB;
