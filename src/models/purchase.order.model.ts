import mongoose from "mongoose";

const purchasedProductsSchema  = new mongoose.Schema({ //unnecessary
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
})

const purchaseOrderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    orderProducts: [purchasedProductsSchema],
    purchase_date: {
        type: Date,
        default: Date.now,
    },
    billing_address: {
        type: String,
        required: true,
    },
    order_status: {
        type: String,
        enum: ['pre-confirmed', 'confiremd', 'proccessing', 'packing', 'on-delivery', 'delivered']
    }
})

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema)

export default PurchaseOrder