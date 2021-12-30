import UserModel from "../../../models/UserModel";
import bcrypt from "../../../utils/bcrypt";
import jwt from "../../../utils/jwt";
import { Resolvers, User } from "../../../types";

const accountMutations: Resolvers = {
    createAccount: async (_, args) => {
        const { email, fullName, username, password } = args.user as User;
        const newUser = await UserModel.create({
            email,
            fullName,
            username,
            password: await bcrypt.hash(password),
        });
        return {
            status: 201,
            token: "Bearer " + jwt.sign(newUser._id),
        };
    },
    loginAccount: async (_, args, context) => {
        if (context.status === 400) return context;
        else {
            const { email, password } = args.user as User;
            const account = await UserModel.findOne({ email });
            if (!account) {
                return {
                    status: 400,
                    error: "Wrong email",
                };
            }
            const checkPassword = await bcrypt.compare(
                password,
                account.password
            );

            if (!checkPassword) {
                return {
                    status: 400,
                    error: "Wrong password",
                };
            }
            return {
                status: 200,
                token: "Bearer " + jwt.sign(account._id),
            };
        }
    },
};

export default accountMutations;
