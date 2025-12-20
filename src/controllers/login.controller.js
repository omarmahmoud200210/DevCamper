import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { verifyPassword } from "../config/password.js";

const renderLoginPage = (req, res) => {
  res.render("login", {
    msg: req.query.success
      ? { success: req.query.success }
      : req.query.error
      ? { error: req.query.error }
      : "",
  });
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", { msg: "Please fill in all fields" });
  } else {
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("login", { msg: "User not found" });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.render("login", { msg: "Invalid password" });
    } else {
      const payload = { id: user._id, username: user.username, role: user.role };
      const rememberMe = req.body["remember-me"];
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
      });

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      };

      res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 60 * 1000,
      });

      if (rememberMe === "on") {
        res.cookie("refreshToken", refreshToken, {
          ...cookieOptions,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
      } else {
        res.cookie("refreshToken", refreshToken, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
      }

      return res.redirect(303, "/");
    }
  }
};

export { renderLoginPage, handleLogin };
