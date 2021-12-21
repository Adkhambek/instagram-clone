import mongoose, { ConnectOptions } from "mongoose";
import keys from "../config/keys";

export default async function (): Promise<void> {
    try {
        await mongoose.connect(keys.dbUrl!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("DB connected");
    } catch (err) {
        console.log(err);
    }
}
