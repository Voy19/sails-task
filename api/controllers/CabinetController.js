/**
 * CabinetController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
   cabinet: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            return res.send(err)
         }
         if (info !== undefined) {
            return res.send({
               message: info.message,
            })
         }
         if (user) {
            const data = {
               name: user.name,
               surname: user.surname,
               level: user.levelId.level
            }
            res.send(data);
         }
      })(req, res);
   },

};