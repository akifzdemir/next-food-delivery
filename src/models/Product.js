import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})



export default mongoose.models.Product || mongoose.model('Product', ProductSchema)