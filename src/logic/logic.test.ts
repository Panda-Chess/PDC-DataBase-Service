import { describe, it } from "@jest/globals";
import { Game, User, generatePieceSet } from "@panda-chess/pdc-core";
import { createGame, createUser, deleteGame, getGameByUser, getUnstartedGames, modifyGame,  } from "."
import { connectToDatabase } from "../databaseConnector";
import dotenv from "dotenv";
import { UserStatus } from "@panda-chess/pdc-core/dist/utils/userStatus";
import { deleteUser, getUserByID } from "./user.logic";

describe("Logic", () => {    
    let testGame: Game;
    let testUser1: User;
    let testUser2: User;

    beforeAll(async () => {
        dotenv.config();
        await connectToDatabase();
    });

    it("should create test users1", async () => {
        const user: User = {
            name: "testUser1",
            email: "testUser1@gmail.com",
            password: "testUser1",
            status: "online",
            draws: 0,
            losses: 0,
            wins: 0,
            score: 0,
        }

        testUser1 = await createUser(user);

        expect(testUser1._id).toBeDefined();
    });
    
    it("should create test users2", async () => {
        const user: User = {
            name: "testUser2",
            email: "testUser2@gmail.com",
            password: "testUser2",
            status: "online",
            draws: 0,
            losses: 0,
            wins: 0,
            score: 0,
        };

        testUser2 = await createUser(user);

        expect(testUser2._id).toBeDefined();
    });

    it("should create test game", async () => {
        let newGame: Game = {
            users: [
                { 
                    user: testUser1, 
                    color: "white", 
                    gamePoints: 0, 
                    socketId: "testSocket1", 
                    status: UserStatus.waiting 
                },
            ],
            currentColor: "white",
            gamePieces: generatePieceSet(),
            gameType: "casual",
        };

        testGame = await createGame(newGame);

        expect(testGame._id).toBeDefined();
    });

    it("should get unstarted games", async () => {
        const unstartedGame: Game[] = await getUnstartedGames("casual");

        const currentGame = unstartedGame.find(x=>x._id?.toString() === testGame._id?.toString());

        expect(currentGame).toBeDefined();
    });

    it("should add the second user to game", async () => {
        const modifiedGame: Game = {
            gamePieces: testGame.gamePieces,
            gameType: testGame.gameType,
            currentColor: "white",
            users: [
                {
                    user: testUser1,
                    color: "white",
                    gamePoints: 0,
                    socketId: "testSocket1",
                    status: UserStatus.online
                },
                {
                    user: testUser2, 
                    color: "black", 
                    gamePoints: 0, 
                    socketId: "testSocket2", 
                    status: UserStatus.online
                }
            ]
        };

        testGame = await modifyGame(testGame._id!, modifiedGame);

        expect(testGame.users.length).toBe(2);
    });

    it("should get game by user", async () => {
        const fetchedGame = await getGameByUser(testUser1._id!);

        expect(fetchedGame).toBeDefined();
    });

    it("should delete user1", async () => {
        await deleteUser(testUser1._id!);

        const deletedUser = await getUserByID(testUser1._id!);

        expect(deletedUser).toBeNull();
    });

    it("should delete user2", async () => {
        await deleteUser(testUser2._id!);

        const deletedUser = await getUserByID(testUser2._id!);

        expect(deletedUser).toBeNull();
    });

    it("should delete game", async () => {
        await deleteGame(testGame._id!);

        const deletedGame = await getGameByUser(testUser1._id!);

        expect(deletedGame).toBeNull();
    });
});