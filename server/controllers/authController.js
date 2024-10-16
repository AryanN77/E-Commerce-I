import express from "express"
import bcrypt from "bcrypt"
import { User } from "../models/User.js";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res.status(403).json({ message: "User Already Exists", success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, name, password: hashedPassword });
        await newUser.save();
        res.status(200).json({ message: "User Registered Successfully", success: true })
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error: ${error}`, success: false })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            return res.status(404).json({ message: "User Doesn't Exists", success: false })
        }
        const checkPass = await bcrypt.compare(password, foundUser.password);
        if (!checkPass) {
            return res.status(401).json({ message: "Invalid Credentials", success: false })
        }
        const token = jwt.sign({ _id: foundUser._id }, process.env.SECRET_JWT)
        res.json({ token, userID: foundUser._id, name: foundUser.name })
    } catch (error) {
        return res.status(500).json({ message: `Internal Server Error: ${error}`, success: false })
    }
}

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, process.env.SECRET_JWT, (err) => {
            if (err) {
                return res.sendStatus(403);
            }
            next()
        })
    } else {
        res.sendStatus(401);
    }
}
