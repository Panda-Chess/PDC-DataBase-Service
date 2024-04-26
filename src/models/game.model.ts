import {Schema, model} from "mongoose";
import {
    Game, 
    Piece, 
    Position,
    UserInGame
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

const userInGameSchema = new Schema<UserInGame>({
    socketId: {type: Schema.Types.String, required: true},
    color: {type: Schema.Types.String, required: true},
    user: {type: Schema.Types.ObjectId, ref: UserModel, required: true},
    gamePoints: {type: Schema.Types.Number, required: true},
    status: {type: Schema.Types.String, required: true}
});

const gameSchema = new Schema<Game>({
    users: [{type: userInGameSchema, required: true}],
    gamePieces: [{type: pieceSchema, required: true}],
    gameType: {type: Schema.Types.String, required: true},
});

export const GameModel = model<Game>("Game", gameSchema);