import mongoose, {Document} from "mongoose";
import { ISupplier } from "../interfaces/ISupplier";

const SupplierSchema = new mongoose.Schema({
    supplierName: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
},
{
    timestamps:true,
}
);

export const SupplierModel = mongoose.model<ISupplier & Document>('Supplier', SupplierSchema);