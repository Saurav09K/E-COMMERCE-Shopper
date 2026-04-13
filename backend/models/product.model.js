import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
    },
    image:{
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true, 
    },
    subCategory: {
        type: String,
        required: true, 
    },
    sizes:{
        type: [String],
    },
    bestseller: {
        type: Boolean,
        default: false,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    role: { 
            type: String, 
            enum: ['user', 'admin'], 
            default: 'user' 
        },
})

const Product = mongoose.model("Product", productSchema);
export default Product;