import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();  // Carica le variabili d'ambiente dal file .env

// Configurazione delle opzioni per la strategia JWT
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Configurazione delle opzioni per la strategia Google OAuth
const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: ['profile', 'email'],  // Aggiungi qui i parametri scope
  response_type: 'code'
};

// Funzione per configurare le strategie Passport
const configurePassport = (passport) => {
  // Configurazione della strategia JWT
  passport.use(
    new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );

  // Configurazione della strategia Google OAuth
  passport.use(
    new GoogleStrategy(googleOptions, async (_accessToken, _refreshToken, profile, done) => {
      try {
        const { email, sub } = profile._json;
        let user = await User.findOne({ email });

        if (user) {
          return done(null, user);
        } else {
          user = new User({
            username: email,
            email: email,
            googleId: sub,
            name: profile.displayName,
          });
          await user.save();
          return done(null, user);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );

  // Serializzazione dell'utente
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserializzazione dell'utente
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

export default configurePassport;
