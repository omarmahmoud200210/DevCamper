import User from "../models/user.model.js";
import { hashPassword } from "../config/password.js";
import jwt from "jsonwebtoken";

const renderRegisterPage = (req, res) => res.render("register");

const handleRegistration = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.render("register", { msg: "Please fill in all fields" });
  }

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.render("register", { msg: "User already exists" });
    } else {
      let hashedPassword = await hashPassword(password);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role,
      });

      const savedUser = await newUser.save();

      if (savedUser) {
        const payload = {
          id: savedUser._id,
          username: savedUser.username,
          role: savedUser.role,
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "15m",
        });
        const refreshToken = jwt.sign(
          payload,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "7d",
          }
        );

        const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        };

        res.cookie("accessToken", accessToken, {
          ...cookieOptions,
          maxAge: 15 * 60 * 60 * 1000,
        });

        res.cookie("refreshToken", refreshToken, {
          ...cookieOptions,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.redirect(303, "/");
      }
    }
  } catch (err) {
    res.render("register", {
      msg: "Something wrong with the registration process",
    });
    console.log(err);
  }
};

export { renderRegisterPage, handleRegistration };
