import { Router } from "express";
import { GameModel, UserModel } from "../models";
import { Game, generatePieceSet } from "@panda-chess/pdc-core";

const router = Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const game = await GameModel.findById(id);

    const gameWithPlayers = await game?.populate({path: "users", model: UserModel});

    if (!gameWithPlayers) {
        return res.status(404).json({ message: "Game not found" });
    }

    res.json(gameWithPlayers);
});

router.get("/", async (req, res) => {
    const games = await GameModel.find();

    res.json(games);
});

router.post("/", async (req, res) => {
    const {whitePlayer, blackPlayer} = req.body;

    const newGame: Game = {
        users: [whitePlayer, blackPlayer],
        gamePieces: generatePieceSet(),
    };

    const game = new GameModel(newGame);

    await game.save();

    res.status(201).json(game);
});

export default router;