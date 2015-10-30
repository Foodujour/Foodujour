var config = require('./config');
var User   = require('../models/user');
var LocalStrategy      = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy   = require('passport-facebook').Strategy;


module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.name);
  });

  passport.deserializeUser(function(user, done) {
    User.findByUsername(user, function(err, user) {
      done(err, user);
    });
  });

  // Local Strategy -- SIGN UP
  passport.use('local-signup', new LocalStrategy(
    function(username, password, done) {
      process.nextTick(function() {
        User.findByUsername(username, function(err, user) {
          if (err) {
            return done(err);
          }

          if (user) {
            return done(null, false, { message: 'User Already exists' });
          }
          User.generateHash(password)
          .then(function(passHash) {
            User.signUp({
              name: username,
              passHash: passHash
            })
            .then(function(newUser) {
              return done(null, newUser, { message: 'Successfully Signed Up' });
            })
            .catch(function(err) {
              throw err;
            });
          })
          .catch(function(err) {
            throw err;
          });
        });
      });
    })
  );

  // Local Strategy -- LOG IN
  passport.use('local-login', new LocalStrategy(
    function(username, password, done) {
      User.findByUsername(username, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        User.validPassword.call(user, password)
          .then(function(valid) {
            if (!valid) {
              return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user, { message: 'Successfully Logged In' });
          });
      });
    })
  );

  // Google Strategy
  passport.use(new GoogleStrategy({
      clientID:     config.GoogleAuth.clientId || 'banana',
      clientSecret: config.GoogleAuth.clientSecret,
      callbackURL: config.GoogleAuth.callbackURL,
      passReqToCallback   : true
       //NOTE :
      //Carefull ! and avoid usage of Private IP, otherwise you will get the
      //device_id device_name issue for Private IP during authentication
      //The workaround is to set up thru the google cloud console a fully qualified
      //domain name such as http://mydomain:3000/
      //then edit your /etc/hosts local file to point on your private IP.
      //Also both sign-in button + callbackURL has to be share the same url,
      //otherwise two cookies will be created and lead to lost your session
      //if you use it.
    },
    function(request, accessToken, refreshToken, profile, done) {

      process.nextTick(function () {
        console.log('google profile: ', profile);
        User.findByGoogleID(profile.id, function(err, user) {
          if (err) {
            return done(err);
          }

          if (user) {
            // if user is found log them in
            console.log('user found', user);
            return done(null, user);
          } else {
            var newUser = {
              name: profile.displayName + '_G_' + profile.emails[0].value,
              google_id: profile.id,
              google_name: profile.displayName,
              google_email: profile.emails[0].value
            };
            User.signUp(newUser)
              .then(function(newUser) {
                return done(null, newUser);
              })
              .catch(function(err) {
                throw err;
              });
          }
        });
      });
    }
  ));

 //Facebook Strategy
  passport.use(new FacebookStrategy({
      clientID:     config.FacebookAuth.clientId,
      clientSecret: config.FacebookAuth.clientSecret,
      callbackURL:  config.FacebookAuth.callbackURL,
      profileFields: ['id', 'displayName', 'emails'],
      enableProof: false
    },
  function(accessToken, refreshToken, profile, done) {

      process.nextTick(function () {
        console.log('facebook profile: ', profile);
        User.findByFacebookID(profile.id, function(err, user) {
          if (err) {
            return done(err);
          }

          if (user) {
            // if user is found log them in
            return done(null, user);
          } else {
            var newUser = {
              name: profile.displayName + '_FB_' + profile.emails[0].value,
              fb_id: profile.id,
              fb_name: profile.displayName,
              fb_email: profile.emails[0].value
            };
            User.signUp(newUser)
              .then(function(newUser) {
                return done(null, newUser);
              })
              .catch(function(err) {
                throw err;
              });
          }
        });
      });
    }
  ));
};
