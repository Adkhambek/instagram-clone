import UserModel from "../../../models/UserModel";

const userQueries = {
    users: async () => UserModel.find(),
};

export default userQueries;
