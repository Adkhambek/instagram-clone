import { sign, verify } from "jsonwebtoken";
import keys from "../config/keys";
const { secretKey, expiresIn } = keys;

export default {
    sign: (playload: any) =>
        sign({ playload }, secretKey as string, { expiresIn }),
    verify: (token: string) => verify(token, secretKey as string),
};
