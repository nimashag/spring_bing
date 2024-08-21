import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema({
    province: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    postal_code: {
        type: String,
    }
})

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: [String],
        required: true,
    },
    address: {
       type: [userAddressSchema] 
    },
    profile_image_path: {
        type: String,
    },
    dob: {
        type: Date,
    },
}, { timestamps: true }); 

const User = mongoose.model("User", userSchema);

export default User;
