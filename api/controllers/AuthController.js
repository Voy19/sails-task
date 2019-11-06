/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const hashSecretWord = require("../../helpers/crypt").hashPassword;
const passport = require('passport');
const jwt = require("jsonwebtoken");
const secretWord = 'something strange';

module.exports = {
   login: async (req, res) => {
      passport.authenticate('local', (err, user, info) => {
         if (err) {
            return res.send(err)
         }
         if (info !== undefined) {
            return res.send({
               message: info.message,
            })
         }
         const token = jwt.sign({
            id: user.id,
            iat: Math.floor(Date.now() / 1000) + 600
         }, hashSecretWord(secretWord));
         req.login(
            user, {
               session: true
            },
            err => {
               if (err) {
                  res.send(err);
               }
               req.session.role = user.role.role
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