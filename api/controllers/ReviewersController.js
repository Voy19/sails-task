/**
 * ReviewersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
const nestedPop = require('nested-pop');

module.exports = {
   evaluation: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            return res.status(400).send(err);
         }
         if (info !== undefined) {
            return res.status(400).send({
               message: info.message,
            })
         }

         if (user.id !== +req.params.reviewerId) {
            return res.status(400).send("you don't have access to this");
         }

         const updatedData = {
            "code quality": req.body["code quality"],
            competence: req.body.competence,
            "Interaction with colleagues": req.body["Interaction with colleagues"],
            "Quality of task closure": req.body["Quality of task closure"],
            discipline: req.body.discipline,
            innovation: req.body.innovation,
            proactivity: req.body.proactivity,
            "fuck up": req.body["fuck up"],
            isPending: false
         };

         Reviewers.findOne({
            userId: req.params.reviewerId,
            assessmentId: req.params.assessmentId,
            isPending: true
         }).populate('assessmentId').then(review => {
            if (Object.keys(review).length && !review.assessmentId.isFinished) {
               Reviewers.update({
                  userId: req.params.reviewerId,
                  assessmentId: req.params.assessmentId
               }, updatedData).exec(function (err) {
                  if (err) {
                     return res.status(400).send(err);
                  }
                  res.send('Evaluation success');
               });
            } else {
               res.status(400).send("You can't rating this assessment")
            }
         }).catch(err => {
            res.status(404).send("This assessment isn't found or has already been rated");
         })
      })(req, res)
   },

   allReviews: (req, res) => {
      passport.authenticate('jwt', (err, user, info) => {
         if (err) {
            return res.status(400).send(err);
         }
         if (info !== undefined) {
            return res.status(400).send({
               message: info.message,
            })
         }

         // if (user.id !== +req.params.userId) {
         //    return res.status(400).send("you don't have access to this");
         // }

         Reviewers.find({
            userId: req.params.userId,
            isPending: true
         }).populate('userId').populate('assessmentId').then(reviews => {
            return nestedPop(reviews, {
               assessmentId: {
                  as: 'assessments',
                  populate: [
                     'levelId', 'userId', 'reviewers'
                  ]
               }
            }).then(reviews => {
               const reviewsList = reviews.map(review => {
                  if (!review.assessmentId.isFinished) {
                     return {
                        id: review.id,
                        assessmentId: review.assessmentId.id,
                        createdAt: review.assessmentId.createdAt,
                        name: review.assessmentId.userId.name,
                        surname: review.assessmentId.userId.surname,
                        level: review.assessmentId.levelId.level
                     }
                  }
               });

               const reviewsFilter = reviewsList.filter(review => {
                  if (review) {
                     return review;
                  }
               })
               res.send(reviewsFilter);
            }).catch(err => {
               throw err;
            });
         }).catch(err => {
            throw err;
         });
      })(req, res)
   }
};