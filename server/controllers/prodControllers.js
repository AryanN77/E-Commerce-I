import express from "express"
import Product from "../models/Product.js"
import { User } from "../models/User.js"

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ products })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const checkout = async (req, res) => {
    try {
        const { customerId } = req.params;
        const { cartItems } = req.body;

        const foundUser = await User.findById(customerId);
        if (!foundUser) {
            return res.status(404).json({ message: "User Not Found", success: false })
        }
        const cartIds = cartItems.map(product => product.id);
        const products = await Product.find({ _id: { $in: cartIds } });
        if (cartItems.length !== products.length) {
            return res.status(404).json({ message: "Product(s) Not Found", success: false });
        }
        let totalPrice = 0;
        for (const item of cartIds) {
            const product = products.find(product => product._id == item);
            if (!product) {
                return res.status(404).json({ message: "Product Not Found", success: false });
            }
            const cartItem = cartItems.find(product => product.id === item);
            if (product.stock < cartItem.quantity) {
                return res.status(400).json({ message: "Insufficient Stock", success: false });
            }
            totalPrice += product.price * cartItem.quantity;
        }

        if (foundUser.availableMoney < totalPrice) {
            return res.status(400).json({ message: "Insufficient Balance", success: false });
        }
        foundUser.availableMoney -= totalPrice;
        foundUser.purchasedProducts.push([...cartIds]);
        await foundUser.save();

        await Product.updateMany({ _id: { $in: cartIds } }, { $inc: { stock: -1 } });
        res.status(200).json({ purchasedItems: foundUser.purchasedProducts });
    } catch (error) {
        console.log(`Some Error Occured: ${error}`);
    }
}