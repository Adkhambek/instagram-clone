import UserModel from "../../../models/UserModel";
import bcrypt from "../../../utils/bcrypt";
import jwt from "../../../utils/jwt";
import { randomNumber } from "../../../utils/randomNumber";
import { Resolvers, User, Confirmation } from "../../../types";
import { sendMail } from "../../../services/nodemailer";

const userMutations: Resolvers = {
    createAccount: async (_, args) => {
        const { email, fullName, username, password } = args.user as User;
        const codeNumber = randomNumber(100000, 999999);
        const newUser = await UserModel.create({
            email,
            fullName,
            username,
            password: await bcrypt.hash(password),
            code: codeNumber,
        });
        await sendMail({
            receiver: newUser.email,
            subject: `${codeNumber} is your Instagram code`,
            text: "",
            html: `Hi,
            Someone tried to sign up for an Instagram account with ${newUser.email}. If it was you, enter this confirmation code in the app:
            <h1>${codeNumber}</h1>
            `,
        });
        return {
            status: 201,
            mail: newUser.email,
        };
    },
    loginAccount: async (_, args) => {
        const { email, password } = args.user as User;
        const account = await UserModel.findOne({ email });
        if (!account) {
            return {
                status: 400,
                error: "Wrong email",
            };
        }
        if (!account.confirmed) {
            return {
                status: 400,
                error: "You have not confirmed yet",
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
            token: "Bearer " + jwt.sign(account._id),
        };
    },
    confirmationCode: async (_, args) => {
        const { email, code } = args as Confirmation;
        const user = await UserModel.findOne({ email });
        if (user.code !== code) {
            return {
                status: 400,
                error: "Wrong code",
            };
        }
        await UserModel.findOneAndUpdate({ email }, { confirmed: true });
        return {
            status: 201,
            token: "Bearer " + jwt.sign(user._id),
        };
    },
};

export default userMutations;
