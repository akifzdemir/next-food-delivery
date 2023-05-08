import mongoose from "mongoose";
import Product from "./Product";
import Restaurant from "./Restaurant";
import User from "./User";


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
    status: {
        type: String,
        required: true,
        enum: ['Bekliyor', 'Hazırlanıyor', 'Reddedildi', 'Teslim edildi'],
        default: 'Bekliyor'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)