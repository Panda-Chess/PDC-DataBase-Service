import { Router } from "express";
import { createUser, getUserByID, getUsers } from "../logic";

const router = Router();

router.get("/:id", async (req, res) => {
    const user = await getUserByID(req.params.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});

router.get("/", async (req, res) => {
    const users = await getUsers();

    res.json(users);
});

router.post("/", async (req, res) => {
    const user = await createUser(req.body);

    res.status(201).json(user);
});

export default router;