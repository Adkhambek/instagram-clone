import { sign, verify } from "jsonwebtoken";
import keys from "../config/keys";
const { secretKey, expiresIn } = keys;


export default {
    sign: (id: string) => sign({ id }, secretKey as string, { expiresIn }),
    verify: (token: string) => verify(token, secretKey as string),
};
