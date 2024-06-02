import { Router } from "express";
import userRouter from "./user.route";
import gameRouter from "./game.route";
import wantsToPlayRouter from "./wantsToPlay.route";

const router = Router();
router.use("/users", userRouter);
router.use("/games", gameRouter);
router.use("/wants-to-play", wantsToPlayRouter);

export default router;