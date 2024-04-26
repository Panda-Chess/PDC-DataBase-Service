import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes";
import { connectToDatabase } from "./databaseConnector";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

export async function startServer() {
    const serverPort = process.env.PORT;

    await connectToDatabase();

    app.use(router);

    app.listen(serverPort, () => {
        console.log("Server is running on port " + serverPort);
    });
}

startServer();