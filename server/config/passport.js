import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import userModel from "../models/usersModel.js";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "something-really-hard-to-guess",
};

const jwtStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  //   userModel.findOne({ _id: jwt_payload.sub }, function (err, user) {
  //     if (err) {
  //       return done(err, false);
  //     }
  //     if (user) {
  //       console.log("user jwt>>>>", user);
  //       return done(null, user);
  //     } else {
  //       return done(null, false);
  //       // or you could create a new account
  //     }
  //   });
  //   userModel.findOne({ _id: jwt_payload.sub }).then((err, user) => {
  //     console.log("user.....", user);
  //     console.log("err", err);
  //     if (err) {
  //       return done(err, false);
  //     }
  //     if (user) {
  //       console.log("user jwt>>>>", user);
  //       return done(null, user);
  //     } else {
  //       return done(null, false);
  //       // or you could create a new account
  //     }
  //   });
  try {
    const user = await userModel.findOne({ _id: jwt_payload.sub });
    console.log("user de payload>>>>>", user);
    if (user) {
      console.log("user jwt>>>>", user);
      done(null, user);
    } else {
      console.log("no user");
      done(null, false);
    }
  } catch (error) {
    done(error, false);
  }
});

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};

export default passportConfig;
