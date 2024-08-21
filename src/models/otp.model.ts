import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    otp_code: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '5m', 
    }
}, { timestamps: true });

const OTP = mongoose.model("OTP", otpSchema);

export default OTP;
