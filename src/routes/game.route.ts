import { Router } from "express";
import { 
    createGame, 
    deleteGame, 
    getGameByUser, 
    getGames, 
    getUnstartedGames, 
    getUserByID, 
    modifyGame 
} from "../logic";
import { Game } from "@panda-chess/pdc-core";

const router = Router();

router.get("/:id", async (req, res) => {
    const game = await getUserByID(req.params.id);

    if (!game) {
        return res.status(404).json({ message: "Game not found" });
    }

    res.json(game);
});

router.get("/", async (req, res) => {
    const games = await getGames();

    res.json(games);
});

router.get("/game-by-user/:userId", async (req, res) => {
    const game = await getGameByUser(req.params.userId);

    if (!game) {
        return res.json(null);
    }

    res.json(game);
});

router.get("/unstarted-games/:gameType", async (req, res) => {
    const games = await getUnstartedGames(req.params.gameType);

    if (!games) {
        return res.status(404).json({ message: "No games found" });
    }

    res.json(games);
});

router.put("/:id", async (req, res) => {
    const game: Game = await modifyGame(req.params.id, req.body);

    res.status(200).json(game);
});

router.post("/", async (req, res) => {
    const game = await createGame(req.body);

    res.status(201).json(game);
});

router.delete("/:id", async (req, res) => {
    await deleteGame(req.params.id);

    res.status(204).send();
});

export default router;