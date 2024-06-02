import mongoose, { Schema, model } from "mongoose";
import { WantsToPlay } from "@panda-chess/pdc-core/dist/utils";

export const wantsToPlaySchema = new Schema<WantsToPlay>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    gameType: { type: Schema.Types.String, required: true }
});

export const WantsToPlayModel = model<WantsToPlay>("WantsToPlay", wantsToPlaySchema);