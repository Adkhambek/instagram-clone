import dotenv from "dotenv";
dotenv.config();

export default {
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    saltRounds: 10,
    secretKey: process.env.SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRE,
    zohoMail: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
};
