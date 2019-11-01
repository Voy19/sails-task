/**
 * VacationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const differenceInBusinessDays = require('date-fns/differenceInBusinessDays');
const base = 10;
const date = new Date();
const fullYears = 2;

module.exports = {
   vacationDays: (req, res) => {
      Users.findOne({
            id: req.params.id
         })
         .then(async (user) => {
            if (user !== null) {
               const joinedAt = new Date(user.joinedAt);
               const result = await sails.helpers.calculateVacation(base, date, fullYears, joinedAt);
               res.send(`${result}`);
            } else {
               res.send("No user found.");
            }
         });
   },

   createVacation: (req, res) => {
      passport.authenticate('jwt', async (err, user, info) => {
         if (err) {
            res.send(err)
         }
         if (info !== undefined) {
            res.send({
               message: info.message,
            })
         }
         const joinedAt = new Date(user.joinedAt);
         const total = await sails.helpers.calculateVacation(base, date, fullYears, joinedAt);
         if (total !== null) {
            const result = differenceInBusinessDays(
               new Date(req.body.toDate),
               new Date(req.body.fromDate)
            );
            if (result <= total && result > 0) {
               const vacation = {
                  userId: user.id,
                  fromDate: req.body.fromDate,
                  toDate: req.body.toDate
               }

               Vacation.create(vacation)
                  .then(() => {
                     res.status(200).send("Vacation created successfully")
                  })
                  .catch(err => {
                     res.status(400).send(err)
                  })
            } else {
               res.status(400).send("Invalid")
            }
         } else {
            res.status(422).send("Error during vacation calculation");
         }
      })(req, res)
   },
}