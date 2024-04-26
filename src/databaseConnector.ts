import { connect } from "mongoose";

export const connectToDatabase = async () => {
    const connectionString = process.env.MONGO_URI;

    if (!connectionString) {
        throw new Error("MONGO_URI is not defined");
    }

    await connect(connectionString);

    console.log("Connected to database");
};