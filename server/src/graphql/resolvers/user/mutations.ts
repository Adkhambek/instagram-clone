import UserModel from "../../../models/UserModel";

const accountMutations = {
    createAccount: async (_: any, args: any) => {
        args.user.fullName = "";
        const newUser = await UserModel.create(args.user);
        return newUser;
    },
};

export default accountMutations;
