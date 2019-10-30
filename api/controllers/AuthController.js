/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const jwt = require("jsonwebtoken");
const secretWord = 'something strange';


module.exports = {
   login: (req, res) => {
      passport.authenticate('local', (err, user, info) => {
         if ((err) || (!user)) {
            return res.send({
               message: info.message,
            });
         }
         const token = jwt.sign({
            id: user.id,
            iat: Math.floor(Date.now() / 1000) + 600
         }, secretWord);
         req.login(
            user, {
               session: true
            },
            err => {
               if (err) {
                  res.send(err);
               }
               return res.send({
                  token,
                  user
               });
            }
         );
      })(req, res);
   },
   logout: (req, res) => {
      req.logout();
      res.redirect('/');
   }
};