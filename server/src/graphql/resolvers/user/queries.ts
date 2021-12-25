import UserModel from "../../../models/UserModel";

const userQueries = {
    users: async () => {
        return UserModel.find();
    },
};

export default userQueries;
