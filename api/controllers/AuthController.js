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
   login: (req, res) => {
      if (!req.login) return res.status(400).send('Empty inputs')
      passport.authenticate('local', (err, user, info) => {
         if (err) {
            return res.status(400).send(err)
         }
         if (info !== undefined) {
            return res.status(400).send({
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
                  res.status(400).send(err);
               }
               return res.send({
                  token,
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