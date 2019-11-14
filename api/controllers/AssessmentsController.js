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
            // return res.redirect(302, '/login');
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
         if (user.id !== +req.params.userId) {
            return res.status(400).send("You don't have access to this page");
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

         Users.findOne({
            id: req.body.userId
         }).exec((err, user) => {
            if (err) {
               res.status(400).send('User is not found')
            }
            const data = {
               userId: req.body.userId,
               levelId: req.body.levelId,
               reviewers: req.body.reviewers
            }
            Assessments.findOne({
               userId: req.body.userId,
               isFinished: false
            }).exec((err, assessment) => {
               if(assessment) {
                  return res.status(400).send('This user is already have active assessment');
               }
               else {
                  Assessments.create({
                     userId: req.body.userId,
                     levelId: req.body.levelId
                  }).meta({
                     fetch: true
                  }).then((assessment) => {
                     const createReviewers = data.reviewers.map(reviewer => {
                        return {
                           userId: reviewer,
                           assessmentId: assessment.id
                        }
                     });
                     Reviewers.createEach(createReviewers).then(() => {
                        res.status(200).send("Assesment created successfully");
                     })
                  }).catch(err => {
                     res.status(400).send(err)
                  })
               }
               
            }).catch(err => {
                    Assessments.create({
                        userId: req.body.userId,
                        levelId: req.body.levelId
                     }).meta({
                        fetch: true
                     }).then((assessment) => {
                        const createReviewers = data.reviewers.map(reviewer => {
                           return {
                              userId: reviewer,
                              assessmentId: assessment.id
                           }
                        });
                        Reviewers.createEach(createReviewers).then(() => {
                           res.status(200).send("Assesment created successfully");
                        })
                     }).catch(err => {
                        res.status(400).send(err)
                     })
            })
         })
      });
   },
};