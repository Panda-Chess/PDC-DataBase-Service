import { User } from "@panda-chess/pdc-core";
import { UserModel } from "../models";

export const getUserByID = async (id: string): Promise<User | null> => {
    const user = await UserModel.findById(id);

    return user;
};

export const getUsers = async () => {
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

export const deleteUser = async (id: string) => {
    await UserModel.findByIdAndDelete(id);
};