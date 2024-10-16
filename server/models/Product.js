import mongoose from "mongoose";
const { Schema, model } = mongoose

const productSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

productSchema.pre('save', (next) => {
    this.updatedAt = Date.now();
    next();
})

const Product = model("Products", productSchema);

export default Product;