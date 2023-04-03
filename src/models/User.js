import mongoose from "mongoose"


const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a first name.'],
        maxlength: [25, 'First Name cannot be more than 25 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name'],
        maxlength: [25, 'Last Name cannot be more than 25 characters']
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8
    }

})

export default mongoose.models.User || mongoose.model('User', UserSchema)