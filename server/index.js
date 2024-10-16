import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import { authRouter } from "./routes/authRoutes.js";
import { prodRouter } from "./routes/prodRoutes.js";
import bodyParser from "body-parser";
import cors from "cors"

dotenv.config()
const app = express();
app.use(bodyParser.json())
app.use(cors())
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_CONNECT

app.use("/user", authRouter)
app.use("/shop", prodRouter)

mongoose.connect(MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on Port ${PORT}`);
    })

}).catch((err) => {
    console.log(`Some Error Occured, ${err}`)
})