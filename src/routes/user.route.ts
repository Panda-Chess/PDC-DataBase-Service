import { Router } from "express";
import { UserModel } from "../models";
import { User } from "@panda-chess/pdc-core";

const router = Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

router.get("/", async (req, res) => {
    const users = await UserModel.find();

    res.json(users);
});

router.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    const newUser: User = {
        name,
        email,
        password,
        draws: 0,
        losses: 0,
        wins: 0,
        score: 0,
    };

    const user = new UserModel(newUser);

    await user.save();

    res.status(201).json(user);
});

export default router;