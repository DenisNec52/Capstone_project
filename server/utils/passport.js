import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config()

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
};

const configurePassport = (passport) => {
  if (!jwtOptions.secretOrKey) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
  }

  passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ username: jwtPayload.username });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { error: "This user does not exist" });
        }
      } catch (exception) {
        console.log(exception);
        return done(exception, false);
      }
    })
  );

  passport.use(
    new GoogleStrategy(
      googleOptions,
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const { email, sub } = profile._json;
          const user = await User.findOne({ email });

          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              username: email,
              googleId: sub,
            });
            await newUser.save();
            return done(null, newUser);
          }
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
};
<<<<<<< Updated upstream
=======

export default configurePassport;
>>>>>>> Stashed changes
