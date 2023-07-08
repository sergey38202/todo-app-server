import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth/', userRouter);
app.use('/todo/', todoRouter);

const PORT = process.env.PORT || 5000;

const handleStartServer = async () => {
    try {
       await mongoose.connect(process.env.mongodbURL).then(() => {
            app.listen(PORT, () => {
                console.log(`Server has been started in port ${PORT}`);
            })
        }).catch(error => console.log('server error', error))
    } catch (error) {
        console.log(error);
    }
}

handleStartServer();