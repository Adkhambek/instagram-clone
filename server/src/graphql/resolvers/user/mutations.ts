import UserModel from "../../../models/UserModel";
import bcrypt from "../../../utils/bcrypt";
import jwt from "../../../utils/jwt";
import { randomNumber } from "../../../utils/randomNumber";
import { Resolvers } from "../../../types";
import { sendMail } from "../../../services/nodemailer";

const userMutations: Resolvers = {
    createAccount: async (_, { email, fullName, username, password }) => {
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
    loginAccount: async (_, { email, password }) => {
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
    confirmationCode: async (_, { email, code }) => {
        const user = await UserModel.findOne({ email });
        if (user.code !== code) {
            return {
                status: 400,
                error: "Wrong code",
            };
        }
        if (user.confirmed) {
            return {
                status: 400,
                error: "You have already confirmed",
            };
        }
        await UserModel.findOneAndUpdate({ email }, { confirmed: true });
        return {
            status: 201,
            token: "Bearer " + jwt.sign(user._id),
        };
    },
    resendCode: async (_, { email }) => {
        const user = await UserModel.findOne({ email });
        if (user.confirmed) {
            return {
                status: 200,
                message: "You have already confirmed",
            };
        }
        const codeNumber = randomNumber(100000, 999999);
        await UserModel.findOneAndUpdate(email, { code: codeNumber });
        await sendMail({
            receiver: email,
            subject: `${codeNumber} is your Instagram code`,
            text: "",
            html: `Hi,
            Someone tried to sign up for an Instagram account with ${email}. If it was you, enter this confirmation code in the app:
            <h1>${codeNumber}</h1>
            `,
        });
        return {
            status: 200,
            message: "Code was sent to your email. Please, check it.",
        };
    },
};

export default userMutations;
