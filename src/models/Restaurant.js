import mongoose from "mongoose";
import City from "./City";
import User from "./User";

const RestaurantSchema = mongoose.Schema({
    name: {
        type: String,
        reqired: true
    },
    address: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    }

})


export default mongoose.models.Restaurant || mongoose.model('Restaurant', RestaurantSchema); 