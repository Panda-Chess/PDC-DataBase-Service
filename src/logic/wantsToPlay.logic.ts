import { WantsToPlay } from "@panda-chess/pdc-core/dist/utils";
import { WantsToPlayModel } from "../models/wantsToPlay";

export const playerWantsToPlay = async (wantsToPlay: WantsToPlay): Promise<WantsToPlay> => {
    const newWantsToPlay = new WantsToPlayModel(wantsToPlay);

    await newWantsToPlay.save();

    return await newWantsToPlay.populate("user");
};

export const playerDoesNotWantToPlay = async (id: string): Promise<void> => {
    await WantsToPlayModel.findOneAndDelete({ user: id });
};

export const getPlayersWhoWantToPlay = async (): Promise<WantsToPlay[]> => {
    const wantsToPlay = await WantsToPlayModel.find().populate("user");

    return wantsToPlay;
};