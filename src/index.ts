import { connect } from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

async function startServer() {
    const connectionString = process.env.MONGO_URI;

    if (!connectionString) {
        throw new Error("MONGO_URI is not defined");
    }

    await connect(connectionString);

    console.log("Connected to database");

    app.use(router);

    app.listen(80, () => {
        console.log("Server is running on port 80");
    });
}

startServer();