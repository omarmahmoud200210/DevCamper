import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

// 1. JWT Strategy
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["accessToken"];
  return token;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};

const strategyOfJWT = async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

const jwt = new JwtStrategy(options, strategyOfJWT);
passport.use(jwt);

// 2. Oauth Strategy
const credentials = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const googleAuthentication = async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id });
    if (user) return done(null, user);
    else {

      const newUser = await User.create({
        username: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        password: "",
      });

      await newUser.save();
      return done(null, newUser);
    }
  }
  catch (err) {
    return done(err, false);
  }
}

const googleStrategy = new GoogleStrategy(credentials, googleAuthentication);
passport.use(googleStrategy);

export default passport;
