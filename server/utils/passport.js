const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user");
import GoogleStrategy from "passport-google-oauth20";

const options = {
  clientID: GOOGLE_CLIENT_ID,
  clientSECRET: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ username: jwtPayload.username });
        if (user) {
          return done(null, user);
        } else {
          return done(null, false, { error: "This user does not exist" });
        }
      } catch (exception) {
        console.log(exception);
      }
    })
  );
};


const GoogleStrategy = new GoogleStrategy(
  options, 
  async( _accToken, _refreshToken, profile, passportNext)=>{
    try{
    const {email, given_name, family_name, sub, picture} = profile.json;

    const user =await User.findOne({ email });
    if (user){
      const accToken = await createAccessToken({
        _id:user._id
      })
      passportNext(null,{_accToken});
    }else {
      const newUser = new User({
        username : email,
        googleId : sub
      });
      await newUser.save();

      const accToken = await generateJWT({
        username: newUser.username
      });
      passportNext(null,{_accToken});
    }
  }catch (err) {
      passportNext(err);
  }
});