import mongoose, { Schema, Document } from 'mongoose';

interface UserAddress {
    province: string;
    state: string;
    district: string;
    postal_code: string;
}

export interface IUser extends Document {
    fname: string;
    lname: string;
    email: string;
    password: string;
    phoneNumber: string[];
    address?: UserAddress[];
    profile_image_path?: string;
    dob?: Date;
}

const userAddressSchema: Schema = new Schema({
    province: String,
    state: String,
    district: String,
    postal_code: String,
});

const userSchema: Schema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: [String], required: true },
    address: { type: [userAddressSchema] },
    profile_image_path: String,
    dob: Date,
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);