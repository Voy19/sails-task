module.exports = function (req, res, ok) {
   if (req.user && req.user.roleId === 2) {
      return ok();
   } else {
      // return res.send("you aren't an admin");
      return res.redirect('/login');
   };
}