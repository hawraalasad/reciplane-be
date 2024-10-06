const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const dotenv = require("dotenv");
dotenv.config();

const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username, password, done) => {
    try {
      const foundUser = await User.findOne({ username: username });
      if (!foundUser) {
        return done(null, false, { message: "Username or password incorrect" });
      }
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
        return done(null, false, { message: "Username or password incorrect" });
      }
      return done(null, foundUser);
    } catch (error) {
      return done(error);
    }
  }
);

const JwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload._id);
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const expiry = new Date(payload.exp * 1000);
      const now = new Date();
      if (now > expiry) {
        return done(null, false, { message: "Token expired" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = { localStrategy, JwtStrategy };
