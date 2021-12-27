import UserModel from "../../../models/UserModel";
import bcrypt from "../../../utils/bcrypt";

const accountMutations = {
    createAccount: async (_: any, args: any) => {
        const { email, fullName, username, password } = args.user;
        const newUser = await UserModel.create({
            email,
            fullName,
            username,
            password: await bcrypt.hash(password),
        });
        return {
            status: 201,
            id: newUser._id,
        };
    },
    loginAccount: async (_: any, args: any) => {
        const { email, password } = args.user;
        const account = await UserModel.findOne({ email });
        if (!account) {
            return {
                status: 400,
                error: "Wrong email",
            };
        }
        const checkPassword = await bcrypt.compare(password, account.password);

        if (!checkPassword) {
            return {
                status: 400,
                error: "Wrong password",
            };
        }

        return {
            status: 200,
            id: account._id,
        };
    },
};

export default accountMutations;
