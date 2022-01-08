import UserModel from "../../../models/UserModel";
import { Resolvers } from "../../../types";

const followingMutations: Resolvers = {
    following: async (_, { username }, context) => {
        try {
            if (context.status === 400) return context;
            console.log(context._id, username);
            const followingUser = await UserModel.findOne({ username });
            const checkFollowerExist = await UserModel.findOne({
                _id: context._id,
                "following._id": followingUser._id,
            });
            // stop at this position: checking follower exists or not
            console.log(checkFollowerExist);
            await UserModel.updateOne(
                { _id: context._id },
                {
                    $push: { following: followingUser._id },
                }
            );
            await UserModel.updateOne(
                { _id: followingUser._id },
                {
                    $push: { followers: context._id },
                }
            );
            return {
                status: 200,
                message: "You are successfully followed",
            };
        } catch (err) {
            console.log(err);
            return {
                status: 200,
                error: "Something wrong!",
            };
        }
    },
};

export default followingMutations;
