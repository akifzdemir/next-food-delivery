import mongoose from "mongoose";


const CitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})


export default mongoose.models.City || mongoose.model('City', CitySchema)