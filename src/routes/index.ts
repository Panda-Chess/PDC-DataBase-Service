import {Router} from "express";
import userRouter from "./user.route";
import gameRouter from "./game.route";

const router = Router();
router.use("/users", userRouter);
router.use("/games", gameRouter);

export default router;