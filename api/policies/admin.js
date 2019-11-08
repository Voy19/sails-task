const passport = require('passport');

module.exports = function (req, res, ok) {
   passport.authenticate('jwt', (err, user, info) => {
      if (err) {
         return res.send(err);
      }
      if (info !== undefined) {
         return res.send({
            message: info.message,
         })
      }

      if (user.roleId.id === 2) {
         req.user = user;
         return ok();
      } else {
         return res.send("you aren't an admin");
         // return res.redirect('/login');
      };
   })(req, res)

}