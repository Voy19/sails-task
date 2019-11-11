/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
   allLevels: (req, res) => {
      passport.authenticate('jwt', (err, level, info) => {
         if (err) {
            throw new Error(err);
         }
         if (info !== undefined) {
            res.status(400).send({
               message: info.message,
            })
         }

         Levels.find().exec((err, levels) => {
            if (err) {
               res.send(500, {
                  err: err
               });
            }

            const levelsList = levels.map(level => {
               return {
                  id: level.id,
                  level: level.level
               }
            })
            res.send(levelsList);
         })
      })(req, res)
   },
};