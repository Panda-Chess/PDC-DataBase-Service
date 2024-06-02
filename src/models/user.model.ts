import { Schema, model } from "mongoose";
import { User } from "@panda-chess/pdc-core";

export const userSchema = new Schema<User>({
    socketId: { type: String, required: false },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    draws: { type: Number, required: true },
    losses: { type: Number, required: true },
    wins: { type: Number, required: true },
    score: { type: Number, required: true },
});

export const UserModel = model<User>("User", userSchema);