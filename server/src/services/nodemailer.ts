import nodemailer from "nodemailer";
import keys from "../config/keys";
import { Mail, MailSend } from "../types";
const { host, port, user, pass } = keys.zohoMail as Mail;

export const sendMail = async (opt: MailSend) => {
    let transporter = nodemailer.createTransport({
        host,
        port,
        secure: true,
        auth: {
            user,
            pass,
        },
    });

    await transporter.sendMail({
        from: user,
        to: opt.receiver,
        subject: opt.subject,
        text: opt.text,
        html: opt.html,
    });
};
