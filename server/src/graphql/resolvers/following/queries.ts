import UserModel from "../../../models/UserModel";

const followingQueries = {
    followers: async () => UserModel.find(),
};

export default followingQueries;
