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
            userId: req.body.userId,
            level: req.body.level,
            reviewers: ["1", "2"]
         }

         Assesments.create({
            userId: req.body.userId,
            level: req.body.level
         }).meta({
            fetch: true
         }).then((assesment) => {
            const arr = data.reviewers.map(reviewer => {
               return {
                  userId: reviewer,
                  assesmentId: assesment.id
               }
            });
            Reviewers.createEach(arr).then(() => {
               res.status(200).send("Assesment created successfully");
            })
         }).catch(err => {
            res.status(400).send(err)
         })
      })(req, res)
   },
};