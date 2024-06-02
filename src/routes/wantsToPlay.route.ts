import { Router } from "express";
import { getPlayersWhoWantToPlay, playerDoesNotWantToPlay, playerWantsToPlay } from "../logic/wantsToPlay.logic";

const router = Router();

router.get("/", async (req, res) => {
    const wantsToPlay = await getPlayersWhoWantToPlay();

    res.json(wantsToPlay);
});

router.post("/", async (req, res) => {
    const wantsToPlay = await playerWantsToPlay(req.body);

    res.status(201).json(wantsToPlay);
});

router.delete("/:id", async (req, res) => {
    await playerDoesNotWantToPlay(req.params.id);

    res.status(204).send();
});

export default router;