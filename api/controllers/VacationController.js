/**
 * VacationController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
   vacationDays: (req, res) => {
      Users.findOne({
            id: req.params.id
         })
         .then(async (user) => {
            if (user !== null) {
               const base = 10;
               const date = new Date();
               const fullYears = 2;
               const joinedAt = new Date(user.joinedAt);
               const result = await sails.helpers.calculateVacation(base, date, fullYears, joinedAt);
               res.send(`${result}`);
            } else {
               res.send("No user found.");
            }
         });
   }


}