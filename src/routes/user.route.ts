import { Router } from "express";
import { createUser, getUserByID, getUsers } from "../logic";
import { deleteUser, tryLogin } from "../logic/user.logic";

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

router.post("/try-login", async (req, res) => {
    const user = await tryLogin(req.body.email, req.body.password);

    res.json(user);
});

router.post("/", async (req, res) => {
    const user = await createUser(req.body);

    res.status(201).json(user);
});

router.delete("/:id", async (req, res) => {
    deleteUser(req.params.id);

    res.status(204).send();
});

export default router;