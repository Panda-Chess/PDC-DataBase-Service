import { Game, generatePieceSet } from "@panda-chess/pdc-core";
import { GameModel, UserModel } from "../models";

export const getGames = async (): Promise<Game[]> => {
    const games = await GameModel.find();

    return games;
};

export const getGameByUser = async (userId: string): Promise<Game | null> => {
    const game = await GameModel.findOne({users: {$elemMatch: {user: userId}}});

    const gameWithPlayers = await game?.populate({path: "users.user", model: UserModel});

    return gameWithPlayers || null;
};

export const getUnstartedGames = async (gameType: string): Promise<Game[]> => {
    const games = await GameModel.find({gameType: gameType, users: {$size: 1}});

    return games;
};

export const modifyGame = async (id: string, game: Game): Promise<Game> => {
    await GameModel.findByIdAndUpdate(id, game);

    const modifiedGame: Game = (await GameModel.findById(id))!;

    return modifiedGame;
};

export const createGame = async (game: Game): Promise<Game> => {
    const newGame = new GameModel({...game,  gamePieces: generatePieceSet()});

    await newGame.save();

    return newGame;
};

export const deleteGame = async (id: string): Promise<void> => {
    await GameModel.findByIdAndDelete(id);
};