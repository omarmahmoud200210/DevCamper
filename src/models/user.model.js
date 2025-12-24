import mongoose from "mongoose";
import { Schema } from "mongoose";
import crypto from "crypto";

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

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
