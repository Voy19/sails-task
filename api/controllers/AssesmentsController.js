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
         if (user.id !== +req.params.userId) {
            return res.status(400).send("You don't have access to this page");
         }

         Assesments.find({
            userId: req.params.userId,
            isFinished: true
         }).populate('levelId').populate('userId').exec((err, assesments) => {
            if (err) {
               res.send(500, {
                  err: err
               });
            }
            const data = assesments.map(assesment => {
               return {
                  id: assesment.id,
                  createdAt: assesment.createdAt,
                  level: assesment.levelId.level
               }
            })

            res.send(data);
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
         }).populate('levelId').populate('userId').exec((err, assesment) => {
            if (err) {
               res.send(500, {
                  err: err.message
               });
            }
            const data = {
               id: assesment.id,
               createdAt: assesment.createdAt,
               level: assesment.levelId.level
            }

            res.send(data);
         })
      })(req, res)
   },


   createAssesment: (req, res) => {
      Users.find().exec((err, users) => {
         if (err) {
            res.send(500, {
               err: err
            });
         }
         const reviewers = users.map((user) => {
            return user.id
         })

         Users.findOne({
            id: req.body.userId
         }).exec((err, user) => {
            if (err) {
               res.send('User is not found')
            }
            const levelId = user.levelId
            const data = {
               userId: req.body.userId,
               levelId: levelId,
               reviewers: reviewers
            }
            Assesments.create({
               userId: req.body.userId,
               levelId: levelId
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
         })
      });
   },
};