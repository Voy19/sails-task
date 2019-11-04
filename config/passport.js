const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const hashSecretWord = require("../helpers/crypt").hashPassword;
const bcrypt = require('bcryptjs');
const secretWord = 'something strange';

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
   Users.findOne({
      id
   }, function (err, users) {
      done(err, users);
   });
});

passport.use(new LocalStrategy({
      usernameField: "login",
      passwordField: "password"
   },
   (login, password, done) => {
      Users.findOne({
            where: {
               login: login
            }
         }).populate('levelId').populate('vacation').populate('roleId')
         .then(user => {
            if (!user) {
               return done(null, false, {
                  message: "Incorrect login"
               });
            }
            bcrypt.compare(password, user.password, (err, res) => {
               if (!res) return done(null, false, {
                  message: 'Invalid Password'
               });

               const userDetails = {
                  id: user.id,
                  email: user.email,
                  login: user.login,
                  name: user.name,
                  surname: user.surname,
                  level: user.levelId.level,
                  vacation: user.vacation,
                  role: user.roleId
               };
               return done(null, userDetails);
            })
         })
         .catch(err => {
            if (err) {
               return done(err, false, {
                  message: err
               });
            }
         });
   }));


passport.use(new JwtStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: hashSecretWord(secretWord)
   },
   (jwtPayload, done) => {
      if (Math.floor(Date.now() / 1000) > jwtPayload.iat) return done(null, false, {
         message: "Token lifecycling end"
      });
      Users.findOne({
            where: {
               id: jwtPayload.id
            }
         }).populate('levelId')
         .then(user => {
            return done(null, user);
         })
         .catch(err => {
            return done(err, null);
         });
   }
))