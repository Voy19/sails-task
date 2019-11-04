/**
 * AssesmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
   createAssesment: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            return res.send(err);
         }
         if (info !== undefined) {
            return res.send({
               message: info.message,
            })
         }

         const data = {
            userId: user.id,
            level: req.body.level,
            reviewers: ["4", "7"]
         }
         console.log(data);


         Assesments.create(data).then(() => {
            Reviewers.createEach([{
               userId: 2,
               assesmentId: assesmentId
            }, {
               userId: 5,
               assesmentId: assesmentId
            }]).then(() => {
               res.status(200).send("Assesment created successfully");

            })
         }).catch(err => {
            res.status(400).send(err)
         })
      })(req, res)
   },


};