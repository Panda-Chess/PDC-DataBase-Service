import { User } from "@panda-chess/pdc-core";
import { UserModel } from "../models";
import { playerDoesNotWantToPlay } from "./wantsToPlay.logic";

export const getUserByID = async (id: string): Promise<User | null> => {
    const user = await UserModel.findById(id);

    return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const user = await UserModel.findOne({ email });

    return user;
};

export const getUsers = async (): Promise<User[]> => {
    const users = await UserModel.find();

    return users;
};

export const createUser = async (user: User) => {
    const newUser = new UserModel({
        ...user,
        score: 0,
        wins: 0,
        losses: 0,
        draws: 0
    });

    await newUser.save();

    return newUser;
};

export const updateUser = async (user: User) => {
    return await UserModel.findByIdAndUpdate(user._id, user);
};

export const deleteUser = async (id: string) => {
    await playerDoesNotWantToPlay(id);

    await UserModel.findByIdAndDelete(id);
};

export const tryLogin = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email, password });

    return user;
};

export const getOnlineUsers = async () => {
    const users = await UserModel.find({ status: "online" });

    return users;
};