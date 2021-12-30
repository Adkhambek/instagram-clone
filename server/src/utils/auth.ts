import jwt from "./jwt";
import UserModel from "../models/UserModel";
import { Object } from "../types";

export const protectedResolver = async (token: string) => {
    let userId: string | undefined;
    if (token && token.startsWith("Bearer")) {
        userId = token.split(" ")[1];
    }
    if (!userId) {
        return {
            status: 400,
            error: "You are not logged in! Please log in to get access.",
        };
    } else {
        try {
            const { id } = jwt.verify(userId) as Object;
            const user = await UserModel.findById(id);
            if (!user) {
                return {
                    status: 400,
                    error: "The user belonging to this token does no longer exist.",
                };
            } else {
                return user;
            }
        } catch (error) {
            if (error.name === "JsonWebTokenError") {
                return {
                    status: 400,
                    error: "Invalid token. Please, log in again!",
                };
            }
            if (error.name === "TokenExpiredError") {
                return {
                    status: 400,
                    error: "Your token has expired. Please, log in again!",
                };
            }
        }
    }
};
