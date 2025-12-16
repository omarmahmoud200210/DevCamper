import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true,
    },

    role: {
        type: String,
        enum: ["user", "publisher", "admin"],
        default: "user",
    },
    googleId: {
        type: String,
        default: null,
    },
});


const User = mongoose.model("User", userSchema);

export default User;
