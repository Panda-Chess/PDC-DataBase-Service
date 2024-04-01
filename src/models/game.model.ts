import {Schema, model} from "mongoose";
import {
    Game, 
    Piece, 
    Position
} from "@panda-chess/pdc-core";
import { UserModel } from "./user.model";

const positionSchema = new Schema<Position>({
    x: Number,
    y: Number
});

const pieceSchema = new Schema<Piece>({
    pieceId: String,
    color: String,
    pieceType: String,
    position: positionSchema,
    wasMoved: Boolean
});

const gameSchema = new Schema<Game>({
    users: [{type: Schema.Types.ObjectId, ref: UserModel, required: true}],
    gamePieces: [{type: pieceSchema, required: true}],
    gameType: {type: Schema.Types.String, required: true},
});



export const GameModel = model<Game>("Game", gameSchema);