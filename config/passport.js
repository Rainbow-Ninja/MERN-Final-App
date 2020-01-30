const GoogleStrategy = require('passport-google-oauth2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const keys = require("./keys");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const passport = require('passport');



//  passport function for auth //
module.exports = function (passport) {
  passport.use(new GoogleStrategy({

    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, done) {

      console.log("PROFILE", profile)
      const image = profile.photos[0].value.substring(
        0,
        profile.photos[0].value.indexOf("?")
      );
      console.log(image);

      // create user with info coming from google profile //
      const newUser = {
        googleID: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        image: image
      };
      // check for existing user //
      User.findOne({
        googleID: profile.id
      }).then(user => {
        if (user) {
          // return the user already created //
          done(null, user);
        } else {
          // create user and return it //
          new User(newUser).save().then(user => done(null, user));
        }
      });
    }
  ));

  // strategy for attaching jwt token to a user //
  passport.use(new JwtStrategy({
      jwtFromRequest: (req) => {
        let token = null;

        if (req && req.cookies) {
          token = req.cookies['jwt'];
        }

        return token;
      },
      secretOrKey: keys.googleClientSecret
    },
    async (jwt_payload, done) => {
      const user = await User.findById(jwt_payload.sub)
        .catch(done);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}