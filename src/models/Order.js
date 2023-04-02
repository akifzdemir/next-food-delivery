import mongoose from "mongoose";


const OrderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Accepted', 'Rejected', 'Delivered'],
        default: 'Pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)