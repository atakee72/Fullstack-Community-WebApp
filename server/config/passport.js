import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../models/userModel.js";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  // insert your .env variable here: process.env.SECRETORKEY ? to do!
  secretOrKey: "And the sky is blue!",
};

const jwtStrategy = new JwtStrategy(options, function (jwt_payload, done) {
  userModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      console.log(">>>>>>User NOT found!<<<<<<", err);
      return done(err, false);
    }
    if (user) {
      console.log(">>>>>>USER FOUND! Below is the profile information: <<<<<<");
      return done(null, user);
    } else {
      console.log("Something went wrong! (Jwt strategy)");
      return done(null, false);
      // third possibility, just in case, or you might create a new account...
    }
  });
});

export { jwtStrategy };
