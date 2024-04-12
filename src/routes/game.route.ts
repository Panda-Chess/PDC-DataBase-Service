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

router.get("/unstarted-games/:gameType", async (req, res) => {
    const games = await GameModel.find({gameType: req.params.gameType, users: {$size: 1}});

    res.json(games);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const game = req.body;

    await GameModel.findByIdAndUpdate(id, game);

    res.status(204).send();
});

router.post("/", async (req, res) => {
    const gameType = req.body.gameType;

    const newGame: Game = {
        users: req.body.users,
        gamePieces: generatePieceSet(),
        gameType: gameType
    };

    const game = new GameModel(newGame);

    await game.save();

    res.status(201).json(game);
});

export default router;