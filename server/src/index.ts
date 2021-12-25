import connectDB from "./utils/database";
import UserModel from "./models/UserModel";

(async function () {
    await connectDB();
    const newUser = new UserModel({
        email: "muzaffarov.adham@gmail.com",
        fullName: "Muzaffarov Adham",
        username: "Heaven_8",
        password: "heaven12345678",
    });
    await newUser.save();
})();
