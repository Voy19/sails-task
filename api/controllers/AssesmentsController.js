/**
 * AssesmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
   allAssesments: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            throw new Error(err);
         }
         if (info !== undefined) {
            res.send({
               message: info.message,
            })
         }

         Assesments.find({
            userId: req.params.userId,
            isFinished: true
         }).exec((err, assesments) => {
            if (err) {
               res.send(500, {
                  err: err
               });
            }
            res.send(assesments);
         })
      })(req, res)
   },

   activeAssesment: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            throw new Error(err);
         }
         if (info !== undefined) {
            res.send({
               message: info.message,
            })
         }

         Assesments.findOne({
            userId: req.params.userId,
            isFinished: false
         }).exec((err, assesments) => {
            if (err) {
               res.send(500, {
                  err: err
               });
            }
            res.send(assesments);
         })
      })(req, res)
   },


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

         Users.find().exec((err, users) => {
            if (err) {
               res.send(500, {
                  err: err
               });
            }
            const reviewers = users.map((user) => {
               return user.id
            })
            const data = {
               userId: req.body.userId,
               level: req.body.level,
               reviewers: reviewers
            }
            Assesments.create({
               userId: req.body.userId,
               level: req.body.level
            }).meta({
               fetch: true
            }).then((assesment) => {
               const reviewers = data.reviewers.map(reviewer => {
                  return {
                     userId: reviewer,
                     assesmentId: assesment.id
                  }
               });
               Reviewers.createEach(reviewers).then(() => {
                  res.status(200).send("Assesment created successfully");
               })
            }).catch(err => {
               res.status(400).send(err)
            })
         });
      })(req, res)
   },
};