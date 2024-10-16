import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    availableMoney: {
        type: Number,
        default: 7000,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    purchasedProducts: [{
        type: Schema.Types.ObjectId, ref: "Products", default: []
    }]
})

const UserModel = model("Users", userSchema);

export { UserModel as User };