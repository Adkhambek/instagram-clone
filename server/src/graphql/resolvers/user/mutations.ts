import UserModel from "../../../models/UserModel";
import bcrypt from "../../../utils/bcrypt";
import jwt from "../../../utils/jwt";
import { randomNumber } from "../../../utils/randomNumber";
import { Resolvers, Object, User } from "../../../types";
import { sendMail } from "../../../services/nodemailer";
import keys from "../../../config/keys";

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
    forgotPassword: async (_, { email }) => {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return {
                status: 400,
                error: "Wrong email",
            };
        }
        if (!user.confirmed) {
            return {
                status: 400,
                error: "You have not confirmed yet",
            };
        }
        const token: string = jwt.sign(user._id);
        await sendMail({
            receiver: email,
            subject: `${user.username}, we've made it easy to get back on Instagram`,
            text: "",
            html: `
            <p>Hi ${user.username},<p>
            <p>Sorry to hear you’re having trouble logging into Instagram. We got a message that you forgot your password. If this was you, you can get right back into your account or reset your password now.<p>
            <a href="${keys.baseUrl}/reset-password/${token}" style="color:#3b5998;text-decoration:none;display:inline-block" target = "_blank">Reset your password</a>
            `,
        });
        return {
            status: 200,
            token,
            message: "Please, check your email!",
        };
    },
    resetPassword: async (_, { password, token }) => {
        const { id } = jwt.verify(token) as Object;
        await UserModel.findByIdAndUpdate(
            id,
            { password },
            {
                new: true,
                runValidators: true,
            }
        );
        return {
            status: 200,
            message: "Password updated successfully",
        };
    },
};

export default userMutations;
