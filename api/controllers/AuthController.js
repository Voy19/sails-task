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
            iat: Math.floor(Date.now() / 1000) + 60 * 60
         }, hashSecretWord(secretWord));
         req.login(
            user, {
               session: true
            },
            err => {
               if (err) {
                  res.status(400).send(err);
               }

               const data = {
                  id: user.id,
                  name: user.name,
                  surname: user.surname,
                  email: user.email,
                  login: user.login,
                  level: user.level,
                  levelId: user.levelId,
                  vacation: user.vacation,
                  role: user.role.role,
                  roleId: user.role.id
               }

               return res.send({
                  token,
                  data
               });
            }
         );
      })(req, res);
   },

   logout: (req, res) => {
      req.logout();
      res.status(200).send();
   },

   user: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if ((err) || (info !== undefined)) {
            res.status(404).send(false);
         } else {

            const data = {
               id: user.id,
               name: user.name,
               surname: user.surname,
               email: user.email,
               login: user.login,
               level: user.levelId.level,
               levelId: user.levelId.id,
               vacation: user.vacation,
               role: user.roleId.role,
               roleId: user.roleId.id
            }
            res.send(data);
         }
      })(req, res)
   },

   validityJwt: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if ((err) || (info !== undefined)) {
            res.status(400).send(false);
         } else {
            res.send(true);
         }
      })(req, res)
   }
};