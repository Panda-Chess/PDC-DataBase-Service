import {Router} from "express";
import userRouter from "./user.route";
import gameRouter from "./game.route";

const router = Router();
router.use("/user", userRouter);
router.use("/game", gameRouter);

export default router;