/**
 * AssesmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
   allAssessments: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            throw new Error(err);
         }
         if (info !== undefined) {
            res.status(400).send({
               message: info.message,
            })
         }
         if (user.id !== +req.params.userId) {
            return res.status(400).send("You don't have access to this page");
         }

         Assessments.find({
            userId: req.params.userId,
            isFinished: true
         }).populate('levelId').populate('userId').exec((err, assessments) => {
            if (err) {
               res.send(500, {
                  err: err
               });
            }
            const data = assessments.map(assessment => {
               return {
                  id: assessment.id,
                  createdAt: assessment.createdAt,
                  level: assessment.levelId.level
               }
            })
            res.send(data);
         })
      })(req, res)
   },

   activeAssessment: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            throw new Error(err);
         }
         if (info !== undefined) {
            res.status(400).send({
               message: info.message,
            })
         }

         Assessments.findOne({
            userId: req.params.userId,
            isFinished: false
         }).populate('levelId').populate('userId').exec((err, assessment) => {
            if (err) {
               res.send(500, {
                  err: err.message
               });
            }
            const data = {
               id: assessment.id,
               createdAt: assessment.createdAt,
               level: assessment.levelId.level
            }

            res.send(data);
         })
      })(req, res)
   },

   createAssessment: (req, res) => {
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
            Assessments.create({
               userId: req.body.userId,
               levelId: levelId
            }).meta({
               fetch: true
            }).then((assessment) => {
               const reviewers = data.reviewers.map(reviewer => {
                  return {
                     userId: reviewer,
                     assessmentId: assessment.id
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