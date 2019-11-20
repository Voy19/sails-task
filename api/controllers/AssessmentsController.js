/**
 * AssesmentsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const nestedPop = require('nested-pop');

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
         }).populate('levelId').populate('userId').populate('reviewers').exec((err, assessments) => {
            if (err) {
               res.send(500, {
                  err: err
               });
            }


            const data = assessments.map(assessment => {
               return {
                  id: assessment.id,
                  createdAt: assessment.createdAt,
                  finishedAt: assessment.finishedAt,
                  level: assessment.levelId.level,
                  reviewers: assessment.reviewers,
                  english: assessment.english,
                  bonuses: assessment.bonuses
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
         }).populate('levelId').populate('userId').populate('reviewers').exec((err, assessment) => {
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
            if (assessment) {
               return res.status(400).send('This user is already have active assessment');
            } else {
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
   },

   allActiveAssessments: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            throw new Error(err);
         }
         if (info !== undefined) {
            res.status(400).send({
               message: info.message,
            })
         }

         Assessments.find({
            isFinished: false
         }).populate('levelId').populate('userId').populate('reviewers').then(assessments => {
            return nestedPop(assessments, {
               reviewers: {
                  as: 'reviewers',
                  populate: [
                     'userId'
                  ]
               }
            }).then(assessments => {
               const assessmentsList = assessments.map(assessment => {
                  const reviewersData = assessment.reviewers.map(reviewer => {
                     return {
                        name: reviewer.userId.name,
                        surname: reviewer.userId.surname,
                        "IWC": reviewer["Interaction with colleagues"],
                        "QTC": reviewer["Quality of task closure"],
                        "code quality": reviewer["code quality"],
                        competence: reviewer.competence,
                        discipline: reviewer.discipline,
                        "fuck up": reviewer["fuck up"],
                        innovation: reviewer.innovation,
                        proactivity: reviewer.proactivity
                     }
                  })
                  return {
                     id: assessment.id,
                     createdAt: assessment.createdAt,
                     level: assessment.levelId.level,
                     name: assessment.userId.name,
                     surname: assessment.userId.surname,
                     reviewers: reviewersData
                  }
               })
               res.send(assessmentsList);
            }).catch(err => {
               throw err;
            });
         }).catch(err => {
            throw err;
         });
      })(req, res)
   },

   allAssessmentsForAdmin: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            throw new Error(err);
         }
         if (info !== undefined) {
            res.status(400).send({
               message: info.message,
            })
         }
         // if (user.id !== +req.params.userId) {
         //    return res.status(400).send("You don't have access to this page");
         //    // return res.redirect(302, '/login');
         // }

         Assessments.find({
            isFinished: true
         }).populate('levelId').populate('userId').populate('reviewers').then(assessments => {
            return nestedPop(assessments, {
               reviewers: {
                  as: 'reviewers',
                  populate: [
                     'userId'
                  ]
               },
            }).then(assessments => {
               const assessmentsList = assessments.map(assessment => {
                  const reviewersData = assessment.reviewers.map(reviewer => {
                     return {
                        name: reviewer.userId.name,
                        surname: reviewer.userId.surname,
                        "Interaction with colleagues": reviewer["Interaction with colleagues"],
                        "Quality of task closure": reviewer["Quality of task closure"],
                        "code quality": reviewer["code quality"],
                        competence: reviewer.competence,
                        discipline: reviewer.discipline,
                        "fuck up": reviewer["fuck up"],
                        innovation: reviewer.innovation,
                        proactivity: reviewer.proactivity
                     }
                  })
                  return {
                     id: assessment.id,
                     createdAt: assessment.createdAt,
                     finishedAt: assessment.finishedAt,
                     level: assessment.levelId.level,
                     name: assessment.userId.name,
                     surname: assessment.userId.surname,
                     bonuses: assessment.bonuses,
                     english: assessment.english,
                     reviewers: reviewersData
                  }
               })
               res.send(assessmentsList);
            }).catch(err => {
               throw err;
            });
         }).catch(err => {
            throw err;
         });
      })(req, res)
   },

   closeAssessment: (req, res) => {
      Assessments.update({
         id: req.params.assessmentId,
      }, {
         isFinished: true,
         finishedAt: new Date(),
         english: req.body.english,
         bonuses: req.body.bonuses
      }).exec(function (err) {
         if (err) {
            return res.status(400).send(err);
         }
         res.send('Assessment closed successfully');
      })
   }
};