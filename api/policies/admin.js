module.exports = function (req, res, ok) {
   if (req.user && req.session.role === 'admin') {
      return ok();
   } else {
      return res.send("you aren't an admin");
      // return res.redirect('/login');
   };
}