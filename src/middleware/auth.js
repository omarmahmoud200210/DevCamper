import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/user.model.js";

const authenticationMiddleware = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    if (user) {
      req.user = user;
      return next();
    }

    const refreshCookie = req.cookies["refreshToken"];

    if (refreshCookie) {
      jwt.verify(
        refreshCookie,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) return next();

          const dbUser = await User.findById(decoded.id);
          if (!dbUser) return next();

          const cookiesOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          };

          const payload = {
            id: dbUser._id,
            role: dbUser.role,
          };

          const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "15m",
            }
          );

          const refToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "7d",
          });

          res.cookie("accessToken", accessToken, {
            ...cookiesOptions,
            maxAge: 15 * 60 * 60 * 1000,
          });

          res.cookie("refreshToken", refToken, {
            ...cookiesOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          req.user = dbUser;
          next();
        }
      );
    } else {
      next();
    }
  })(req, res, next);
};

export default authenticationMiddleware;
