const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser((id, done) => {
   User.findOne({
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
         }).populate('levelId')
         .then(user => {
            if (!user) {
               return done(null, false, {
                  message: "Incorrect username."
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
                  level: user.levelId.level
               };
               return done(null, userDetails);
            })
         })
         .catch(err => {
            if (err) {
               return done(err);
            }
         });
   }));