import userModel from "../models/userModel.js";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
};
const passportConfig = (passport) => {
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const user = await userModel.findOne({ _id: jwt_payload._id }).select('-password').select( '-is_verified');
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }));
  };
export default passportConfig;
