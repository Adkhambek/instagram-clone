import bcrypt from "bcrypt";
import keys from "../config/keys";

export default {
    hash: (password: string) => bcrypt.hash(password, keys.saltRounds),
    compare: (inputPassword: string, hash: string) =>
        bcrypt.compare(inputPassword, hash),
};
