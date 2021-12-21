import mongoose from "mongoose";
import connectDB from "./lib/database";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password required"],
    },
    followers: {
        type: Number,
        default: 0,
    },
});

const User = mongoose.model("User", userSchema);

(async function () {
    await connectDB();
    const testUser = new User({
        username: "Adham",
        password: "heaven12345678",
    });

    await testUser.save();
})();
